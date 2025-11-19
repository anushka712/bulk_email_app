import { Stack } from "@mantine/core";

const CenteredLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white shadow-lg">
      <div className="">
        <Stack w="100%" p="lg" gap="lg">
          {children}
        </Stack>
      </div>
    </div>
  );
};

export default CenteredLayout;
