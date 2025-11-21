import { Link, useNavigate } from "react-router";

import { Button, Stack, TextInput } from "@mantine/core";

import { useForm } from "@mantine/form";

import CenteredLayout from "../layouts/CenteredLayout";

import { useLoginUser } from "../services/user/userQueries";

import { initialValues, validateSignIn } from "../validations/signInValidation";

import { IconMailOpened, IconLock } from "@tabler/icons-react";

function SignInScreen() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
    validate: validateSignIn,
  });

  const navigate = useNavigate();

  // queries
  const { mutateAsync: loginUser, isPending } = useLoginUser();

  // methods
  const handleSignIn = async (signInCredential) => {
    try {
      await loginUser(signInCredential);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CenteredLayout>
      <form onSubmit={form.onSubmit(handleSignIn)}>
        <div className="mb-2 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">
            Sign in to continue your journey
          </p>
        </div>

        <Stack gap="xs">
          <TextInput
            required
            placeholder="Email address"
            type="email"
            radius="sm"
            size="sm"
            key={form.key("email")}
            {...form.getInputProps("email")}
            leftSection={<IconMailOpened size={14} />}
          />

          <TextInput
            required
            placeholder="Password"
            type="password"
            radius="sm"
            size="sm"
            key={form.key("password")}
            {...form.getInputProps("password")}
            leftSection={<IconLock size={14} />}
          />
        </Stack>

        <Button
          fullWidth
          radius="md"
          size="md"
          type="submit"
          loading={isPending}
          className="mt-4"
        >
          Sign In
        </Button>

        <div className="mt-4 text-center text-sm text-gray-500">
          Haven&apos;t signed up yet?{" "}
          <Link to="/sign-up" className="font-medium text-blue-500">
            Sign up here
          </Link>
        </div>
      </form>
    </CenteredLayout>
  );
}

export default SignInScreen;
