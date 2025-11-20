import { Stack } from "@mantine/core";

const CenteredLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen  bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-200 p-8">
        <Stack w="100%" gap="lg">
          {children}
        </Stack>
      </div>
    </div>
  );
};

export default CenteredLayout;
