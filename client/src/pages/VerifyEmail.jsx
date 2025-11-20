import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Text, Button, Stack } from "@mantine/core";
import { useVerifyEmail } from "../services/user/userQueries";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");
  const [verified, setVerified] = useState(false);

  const token = searchParams.get("token");
  const { mutateAsync: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const res = await verifyEmail(token);
        setMessage(res.message || "Email verified successfully!");
        setVerified(true);
      } catch (err) {
        setMessage(
          err?.response?.data || "Verification failed or token expired."
        );
        setVerified(false);
      }
    };

    verify();
  }, [token, verifyEmail]);

  return (
    <Stack
      spacing="md"
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl text-center"
    >
      <Text size="lg">{message}</Text>
      {verified && (
        <Button
          component="a"
          href="/"
          className="mt-4 bg-blue-600 hover:bg-blue-700"
        >
          Go to SignIn
        </Button>
      )}
    </Stack>
  );
};

export default VerifyEmail;
