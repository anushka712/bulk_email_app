import { model, Schema, Types } from "mongoose";

const emailLogSchema = new Schema(
  {
    email: { type: String, default: "" },
    templateId: { type: Types.ObjectId, ref: "EmailTemplate" },
    status: { type: String, enum: ["SUCCESS", "FAILED"] },
    error: String,
  },
  { timestamps: true }
);

export const EmailLog = model("EmailLog", emailLogSchema);
