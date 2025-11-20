import {
  useGetEmailTemplate,
  useProcessBulkEmail,
} from "../services/emailTemplate/emailTemplateQueries";
import { useState } from "react";
import { Select, FileInput, Button, Stack } from "@mantine/core";

import { convertExcelToJSON } from "../utils/convertExcelToJSON";
import EmailLogViewer from "../components/EmailLogView";

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
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <Stack className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-200 p-8 space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Select Email Template
          </label>
          <Select
            data={templateOptions}
            value={selectedTemplate}
            onChange={setSelectedTemplate}
            placeholder="Select Email Template"
            searchable
            nothingFound="No template found"
            className="mb-2"
          />
          <p className="text-sm text-gray-500">
            Please select a template type to see its data below.
          </p>
        </div>

        {selectedTemplateContent && (
          <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-auto max-h-60">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedTemplateContent }}
            />
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Upload Excel File
          </label>
          <FileInput
            placeholder="Select Excel file"
            value={file}
            onChange={setFile}
            accept=".xlsx,.xls"
            className="mb-2"
          />
          <p className="text-sm text-gray-500 mb-1">
            Please upload your Excel file using the correct format.
          </p>
          <a
            href="/users.xlsx"
            download
            className="text-blue-600 hover:underline text-sm"
          >
            Download Sample Excel
          </a>
        </div>

        <Button
          onClick={handleSend}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Send Emails
        </Button>

        <EmailLogViewer />
      </Stack>
    </div>
  );
};

export default Dashboard;
