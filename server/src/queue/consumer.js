import amqp from "amqplib";
import { EmailTemplate } from "../models/emailTemplate.model.js";
import { EmailLog } from "../models/emailLog.model.js";

import { mailTransport } from "../configs/mailer.config.js";

import { io } from "../../app.js";

export const startConsumer = async () => {
  const connection = await amqp.connect(process.env.RABBIT_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue("bulk_email_queue");

  await channel.prefetch(1);

  channel.consume("bulk_email_queue", async (msg) => {
    const { templateId, users } = JSON.parse(msg.content.toString());

    const template = await EmailTemplate.findById(templateId);

    for (let user of users) {
      try {
        await mailTransport.sendMail({
          from: "no-reply@test.com",
          to: user.email,
          subject: template.type,
          html: template.template.replace("{{username}}", user.name),
        });

        const log = await EmailLog.create({
          email: user.email,
          templateId,
          status: "SUCCESS",
        });

        io.emit("new-email-log", log);

        await new Promise((res) => setTimeout(res, 5000));
      } catch (error) {
        const log = await EmailLog.create({
          email: user.email,
          templateId,
          status: "FAILED",
          error: error.message,
        });

        io.emit("new-email-log", log);
      }
    }

    channel.ack(msg);
  });
};
