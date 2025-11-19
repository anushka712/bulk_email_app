import React from "react";
import { Link } from "react-router";

import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import  CenteredLayout  from "../layouts/CenteredLayout";

import { useRegisterUser } from "../services/user/userQueries";

import { initialValues } from "../validations/signUpValidation";

function SignUpScreen() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
  });

  // queries
  const { mutateAsync: registerUser, isPending } = useRegisterUser();

  // methods
  const handleSignUp = async (signUpCredentials) => {
    const result = await registerUser(signUpCredentials);
    console.log(result);
  };

  return (
    <>
      <CenteredLayout>
        <Stack className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Lets Get Started</h2>
          <p className="text-xs text-gray-500">Sign up to start connecting</p>
        </Stack>

        <Stack gap="xs">
          <TextInput
            required
            placeholder="Full Name"
            radius="sm"
            size="sm"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

          <TextInput
            required
            placeholder="Email Address"
            type="email"
            radius="sm"
            size="sm"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <TextInput
            required
            placeholder="Phone Number"
            type="tel"
            radius="sm"
            size="sm"
            {...form.getInputProps("phone")}
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

          <TextInput
            required
            placeholder="Confirm Password"
            type="password"
            radius="sm"
            size="sm"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />
        </Stack>

        <Button
          fullWidth
          radius="sm"
          size="sm"
          onClick={form.onSubmit(handleSignUp)}
          loading={isPending}
        >
          Sign Up
        </Button>

        <div className="mt-2 text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-blue-500">
            Sign in here
          </Link>
        </div>
      </CenteredLayout>
    </>
  );
}

export default SignUpScreen;
