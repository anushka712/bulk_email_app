import { useMutation, useQuery } from "@tanstack/react-query";

import { createEmailTemplateService } from "./emailTemplateService";
import { toast } from "react-toastify";

const emailTemplateService = createEmailTemplateService();

/**
 *
 * @param {*} params
 * @desc Email Template List
 * @returns query
 */
export const useGetEmailTemplate = (params = {}) =>
  useQuery({
    queryKey: ["EMAIL_TEMPLATE", params],
    queryFn: () => emailTemplateService.getAll(params),
  });

export const useProcessBulkEmail = () => {
  return useMutation({
    mutationFn: (payload) => emailTemplateService.processBulkEmail(payload),
    onError: (error) => {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(msg);
    },
    onSuccess: (response) => {
      const msg =
        response?.data?.message ||
        response.message ||
        "Email Sent Successfully!";
      toast.success(msg);
    },
  });
};
