"use client";

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
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toaster } from "sonner";

const SetupForm = () => {
  // if (!token) {
  //   console.log("Setup token:", token);
  // }
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async () => {
    setLoading(true);
    // const { user, session } = await loginWithPassword(data);
    route.push("/overview");
    setLoading(false);
  });

  return (
    <>
      <Toaster position="bottom-right" />
      <Card className="w-full sm:max-w-md">
        <form id="login-form" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-3xl">Setup your account</CardTitle>
            <CardDescription>
              Please enter your account details.
            </CardDescription>
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
                {loading ? <Spinner /> : null}
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
};

export default SetupForm;
