import express from "express";
import {
  getEmailTemplateList,
  processBulkEmail,
} from "../controllers/emailTemplate.controller.js";

const router = express.Router();

router.route("/").get(getEmailTemplateList);

router.route("/bulk-email").post(processBulkEmail);

export default router;
