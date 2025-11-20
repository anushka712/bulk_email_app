import { model, Schema } from "mongoose";
import { EMAIL_TEMPLATE_TYPES } from "../constants/emailTemplate.js";

const emailTemplateTypesArray = Object.values(EMAIL_TEMPLATE_TYPES).map(
  (template) => template.type
);

const emailTemplateSchema = new Schema(
  {
    template: { type: String, default: "" },
    subject: { type: String, default: "", required: true },
    for: {
      type: String,
      enum: {
        values: emailTemplateTypesArray,
        message: "Invalid Email Template!",
      },
      unique: true,
    },
    variables: [{ type: String }],
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const EmailTemplate = model("EmailTemplate", emailTemplateSchema);
