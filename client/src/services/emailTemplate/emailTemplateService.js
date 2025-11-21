import { createBaseService } from "../baseService";
import { axiosInstance } from "../../configs/axios";

export const createEmailTemplateService = () => {
  const baseService = createBaseService("/emailTemplate");

  /**
   * @desc Process bulk email
   */
  const processBulkEmail = async (payload) => {
    const response = await axiosInstance.post(
      "/emailTemplate/bulk-email",
      payload
    );
    return response.data;
  };

  return { ...baseService, processBulkEmail };
};
