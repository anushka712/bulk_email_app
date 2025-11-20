import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { Table, ScrollArea, Text } from "@mantine/core";

const socket = io("http://localhost:5000");

export default function EmailLogViewer() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on("new-email-log", (log) => {
      setLogs((prev) => [...prev, log]);
    });

    return () => socket.off("new-email-log");
  }, []);

  const rows = logs.map((log) => (
    <tr key={log._id} className="hover:bg-gray-100">
      <td className="px-4 py-2 border">{log.email}</td>
      <td className="px-4 py-2 border font-semibold text-green-600">
        {log.status}
      </td>
    </tr>
  ));

  return (
    <div>
      <Text className="font-medium text-gray-700">Email Logs</Text>
      <Text className="text-sm text-gray-500 mt-1">
        After clicking "Send", you will see the email logs appear here in real
        time. No need to reload the page—each email's delivery status will
        update automatically. "Status" indicates whether the email was sent
        successfully or if there was an error.
      </Text>
      
      <ScrollArea className="mt-4 h-fit border rounded-lg shadow-md">
        <Table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border text-left">Email</th>
              <th className="px-4 py-2 border text-left">Status</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}
