import asyncHandler from "express-async-handler";

import { HttpStatus } from "../constants/httpStatus.js";

import { EmailTemplate } from "../models/emailTemplate.model.js";

import { sendToQueue } from "../queue/producer.js";

/**
 * @desc GET Email Template List
 * @route "/emailTemplate"
 */
export const getEmailTemplateList = asyncHandler(async (req, res) => {
  const { keyword } = req.query;

  const aggregationPipeline = [
    {
      $match: {
        $or: [
          { type: { $regex: new RegExp(keyword || "", "i") } },
          { template: { $regex: new RegExp(keyword || "", "i") } },
        ],
      },
    },
    {
      $facet: {
        data: [{ $sort: { type: 1 } }],
        total: [{ $count: "total" }],
      },
    },
  ];

  const [result] = await EmailTemplate.aggregate(aggregationPipeline);

  const totalItem = result?.total[0]?.total || 0;

  res.status(HttpStatus.OK).json({
    data: result?.data || [],
    totalItem,
  });
});

/**
 * @desc Process Bulk Email
 * @route "/emailTemplate/bulk-email"
 */
export const processBulkEmail = async (req, res) => {
  const { templateId, users } = req.body;

  if (!templateId || !users) {
    res.status(400);
    throw new Error("Email Template Id and User can't be null!");
  }

  await sendToQueue({ data: { templateId, users } });

  return res.json({
    message: "Emails queued successfully",
    queued: users.length,
  });
};
