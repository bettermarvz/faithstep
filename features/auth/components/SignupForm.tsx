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
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { signUpWithPassword } from "../api";

const SignupForm = () => {
  const route = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const { data: signUpData } = await signUpWithPassword({
      email: data.email,
      password: data.password,
    });
    console.log(signUpData, "data");
    if (!signUpData.user) {
      toast.error("Signup failed. Please try again.");
      return;
    }
    route.push("/auth/confirm-email");
  });

  const isPasswordMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "email") {
        const email = form.getValues("email");
        if (email && !isValidEmail(email)) {
          form.setError("email", {
            message: "Invalid email address",
          });
        } else {
          form.clearErrors("email");
        }
      }
      if (name === "confirmPassword" || name === "password") {
        const password = form.getValues("password");
        const confirmPassword = form.getValues("confirmPassword");
        if (
          password &&
          confirmPassword &&
          !isPasswordMatch(password, confirmPassword)
        ) {
          form.setError("confirmPassword", {
            message: "Passwords do not match",
          });
        } else {
          form.clearErrors("confirmPassword");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <>
      <Toaster position="bottom-right" />
      <Card className="w-full sm:max-w-md">
        <form id="signup-form" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-3xl">Welcome to FaithStep</CardTitle>
            <CardDescription>
              Start growing with your faith one step at a time.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 my-5">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    {...field}
                    // id={field.name}
                    // value={field.value}
                    // onBlur={field.handleBlur}
                    // onChange={(e) => field.handleChange(e.target.value)}
                    // aria-invalid={isInvalid}
                    placeholder="Please enter your full name"
                    // autoComplete="off"
                    type="text"
                  />
                  {/* {isInvalid && <FieldError errors={field.state.meta.errors} />} */}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    // id={field.name}
                    // value={field.value}
                    // onBlur={field.handleBlur}
                    // onChange={(e) => field.handleChange(e.target.value)}
                    // aria-invalid={true}
                    placeholder="Please enter your email"
                    // autoComplete="off"
                    type="email"
                  />
                  {/* {isInvalid && <FieldError errors={field.state.meta.errors} />} */}
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
                    // id={field.name}
                    // value={field.value}
                    // onBlur={field.handleBlur}
                    // onChange={(e) => field.handleChange(e.target.value)}
                    // aria-invalid={true}
                    placeholder="Please enter your password"
                    // autoComplete="off"
                    type="password"
                  />
                  {/* {isInvalid && <FieldError errors={field.state.meta.errors} />} */}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    // id={field.name}
                    // value={field.value}
                    // onBlur={field.handleBlur}
                    // onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Please confirm your password"
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
                form="signup-form"
              >
                Signup
              </Button>
              <a
                className="cursor-pointer w-full text-center"
                type="button"
                onClick={() => route.push("/auth/login")}
              >
                Login
              </a>
            </Field>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default SignupForm;

/// Change form into react-hook-form. It is more easy than tankstack form.
// Also add toast notification on submit.
