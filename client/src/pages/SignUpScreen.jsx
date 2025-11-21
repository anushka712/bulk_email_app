
import { Link } from "react-router";

import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import CenteredLayout from "../layouts/CenteredLayout";

import { useRegisterUser } from "../services/user/userQueries";

import { initialValues, validateSignUp } from "../validations/signUpValidation";

import {
  IconUser,
  IconMailOpened,
  IconLock,
  IconPhone,
} from "@tabler/icons-react";

function SignUpScreen() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
    validate: validateSignUp,
  });

  // queries
  const { mutateAsync: registerUser, isPending } = useRegisterUser();

  // methods
  const handleSignUp = async (signUpCredentials) => {
    const result = await registerUser(signUpCredentials);
    form.reset();
    console.log(result);
  };

  return (
    <>
      <CenteredLayout>
        <form onSubmit={form.onSubmit(handleSignUp)}>
          <Stack className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Lets Get Started
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Sign up to start connecting
            </p>
          </Stack>

          <Stack gap="lg">
            <TextInput
              required
              placeholder="Full Name"
              radius="sm"
              size="sm"
              key={form.key("name")}
              {...form.getInputProps("name")}
              leftSection={<IconUser size={14} />}
            />
            <TextInput
              required
              placeholder="Email Address"
              type="email"
              radius="sm"
              size="sm"
              key={form.key("email")}
              {...form.getInputProps("email")}
              leftSection={<IconMailOpened size={14} />}
            />
            <TextInput
              required
              placeholder="Phone Number"
              type="tel"
              radius="sm"
              size="sm"
              {...form.getInputProps("phone")}
              leftSection={<IconPhone size={14} />}
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
            <TextInput
              required
              placeholder="Confirm Password"
              type="password"
              radius="sm"
              size="sm"
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
              leftSection={<IconLock size={14} />}
            />
          </Stack>

          <Button
            fullWidth
            radius="sm"
            size="sm"
            type="submit"
            loading={isPending}
            className="mt-4"
          >
            Sign Up
          </Button>

          <div className="mt-2 text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/sign-in" className="font-medium text-blue-500">
              Sign in here
            </Link>
          </div>
        </form>
      </CenteredLayout>
    </>
  );
}

export default SignUpScreen;
