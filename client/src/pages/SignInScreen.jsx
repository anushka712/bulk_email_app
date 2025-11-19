import React from "react";
import { Link, useNavigate } from "react-router";

import { ActionIcon, Button, Group, Stack, TextInput } from "@mantine/core";

import { useForm } from "@mantine/form";

import CenteredLayout from "../layouts/CenteredLayout";

import { useLoginUser } from "../services/user/userQueries";

import { initialValues } from "../validations/signInValidation";

function SignInScreen() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
  });

  const navigate = useNavigate();

  // queries
  const { mutateAsync: loginUser, isPending } = useLoginUser();

  // methods
  const handleSignIn = async (signInCredential) => {
    await loginUser(signInCredential);
    navigate("/app");

    // window.location.reload();
  };

  return (
    <CenteredLayout>
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
        />

        <TextInput
          required
          placeholder="Password"
          type="password"
          radius="sm"
          size="sm"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
      </Stack>

      <Group justify="end" className="text-sm">
        <div
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </div>
      </Group>

      <Button
        fullWidth
        radius="md"
        size="md"
        onClick={form.onSubmit(handleSignIn)}
        loading={isPending}
      >
        Sign In
      </Button>

      <div className="mt-4 text-center text-sm text-gray-500">
        Haven&apos;t signed up yet?{" "}
        <Link to="/sign-up" className="font-medium text-blue-500">
          Sign up here
        </Link>
      </div>
    </CenteredLayout>
  );
}

export default SignInScreen;
