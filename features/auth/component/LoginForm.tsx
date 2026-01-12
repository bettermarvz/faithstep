"use client";

import * as React from "react";
import { toast, Toaster } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "../type";
import { useRouter } from "next/navigation";
import { login } from "../api/auth";
import { Controller, useForm } from "react-hook-form";

export function LoginForm() {
  const route = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const { user, session } = await login(data);
    console.log({ user, session });
    if (!user && !session) {
      toast.error("Login failed. Please check your credentials.");
      return;
    }
    toast.success(`Welcome back, ${user}!`, { duration: 5000 });
    route.push("/overview");
    // toast("Signing up...");
  });

  return (
    <>
      <Toaster position="bottom-right" />
      <Card className="w-full sm:max-w-md">
        <form id="login-form" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-3xl">Welcome to FaithStep</CardTitle>
            <CardDescription>Please log in to your account.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 my-5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Please enter your email"
                    // autoComplete="off"
                    type="email"
                  />
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Please enter your password"
                    // autoComplete="off"
                    type="password"
                  />
                </Field>
              )}
            />
          </CardContent>
          <CardFooter>
            <Field orientation="vertical">
              <Button
                className="cursor-pointer w-full"
                type="submit"
                form="login-form"
              >
                Login
              </Button>
              <a
                className="cursor-pointer w-full text-center"
                type="button"
                onClick={() => route.push("/auth/signup")}
              >
                Signup
              </a>
            </Field>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
