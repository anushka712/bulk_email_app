import amqp from "amqplib";

let channel;

export const connectQueue = async () => {
  const connection = await amqp.connect(process.env.RABBIT_URL);

  channel = await connection.createChannel();
  await channel.assertQueue("bulk_email_queue");
};

export const sendToQueue = async ({ data }) => {
  channel.sendToQueue("bulk_email_queue", Buffer.from(JSON.stringify(data)));
};
