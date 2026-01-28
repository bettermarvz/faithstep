"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { postGratitude } from "../api";

const GratitudeEditor = ({ charLimit = 280 }: { charLimit?: number }) => {
  const form = useForm({
    defaultValues: {
      post: "",
      isAnonymous: false,
    },
  });
  const postValue = useWatch({
    control: form.control,
    name: "post",
  });
  const charCount = postValue.length;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    const res = postGratitude({
      gratitude: data.post,
      isAnonymous: data.isAnonymous,
    });
    if (res) {
      console.log(res);
    }
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full p-4 border-2 border-black/20 rounded-[16px] bg-white max-w-[854px]"
      >
        <Controller
          name="post"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                name="postContent"
                maxLength={charLimit}
                className="w-full border-0 outline-0"
                placeholder="I'm grateful for..."
              />
            </Field>
          )}
        />
        <div className="flex gap-4 items-center justify-between mt-4">
          <p className="text-[14px] text-black/50">
            <Controller
              name="isAnonymous"
              control={form.control}
              render={({ field }) => (
                <>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />{" "}
                  Post anonymously
                </>
              )}
            />
          </p>
          <div className="flex gap-4 items-center justify-end">
            <p className="text-[14px] text-black/50">
              {charCount}/{charLimit}
            </p>
            <button
              className={`capitalize cursor-pointer text-[14px] font-semibold px-[14px] py-[7px] rounded-[100px] w-fit 
         transition-all duration-200 bg-primary-500 hover:bg-primary-600 `}
              type="submit"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default GratitudeEditor;
