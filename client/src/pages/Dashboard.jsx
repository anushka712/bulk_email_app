import {
  useGetEmailTemplate,
  useProcessBulkEmail,
} from "../services/emailTemplate/emailTemplateQueries";
import { useState } from "react";
import { Select, FileInput, Button, Stack } from "@mantine/core";

import { convertExcelToJSON } from "../utils/convertExcelToJSON";

const Dashboard = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [file, setFile] = useState(null);

  //Queries
  const { data: emailTemplate } = useGetEmailTemplate();
  const { mutateAsync: processBulkEmail } = useProcessBulkEmail();

  const templateOptions =
    emailTemplate?.data?.map((item) => ({
      value: item._id,
      label: item.type,
    })) || [];

  const selectedTemplateContent = emailTemplate?.data?.find(
    (item) => item._id === selectedTemplate
  )?.template;

  const handleSend = async () => {
    if (!selectedTemplate) {
      alert("Please select an email template");
      return;
    }
    if (!file) {
      alert("Please select an Excel file to upload");
      return;
    }

    try {
      const users = await convertExcelToJSON(file);

      const payload = {
        templateId: selectedTemplate,
        users,
      };

      const response = await processBulkEmail(payload);
      console.log(response);

      setSelectedTemplate(null);
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <Stack className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-200 p-8">
        <Select
          data={templateOptions}
          value={selectedTemplate}
          onChange={setSelectedTemplate}
          placeholder="Select Email Template"
          searchable
          nothingFound="No template found"
          className="mb-4"
        />
        {selectedTemplateContent && (
          <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-auto max-h-60">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedTemplateContent }}
            />
          </div>
        )}

        <FileInput
          placeholder="Upload Excel file"
          value={file}
          onChange={setFile}
          accept=".xlsx,.xls"
          className="mb-4"
        />

        <Button
          onClick={handleSend}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Send
        </Button>
      </Stack>
    </div>
  );
};

export default Dashboard;
