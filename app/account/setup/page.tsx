"use client";

import SetupForm from "@/features/account/component/SetupForm";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const SetupFormWrapper = () => {
  //useSearchParams()needs to be inside a component that's wrapped by Suspense so we made this wrapper setupFormWrapper.
  const params = useSearchParams();
  const code = params.get("code");
  const token = code ? String(code) : "";

  return <SetupForm token={token} />;
};

const AccountSetup = () => {
  return (
    <section className="flex justify-center w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <SetupFormWrapper />
      </Suspense>
    </section>
  );
};

export default AccountSetup;
