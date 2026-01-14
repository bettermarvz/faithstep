"use client";

import SetupForm from "@/features/account/component/SetupForm";
import { useSearchParams } from "next/navigation";
import React, { Suspense, use } from "react";

const AccountSetup = () => {
  const params = useSearchParams();

  const code = params.get("code");
  const token = code ? String(code) : "";
  return (
    <section className="flex justify-center w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <SetupForm token={token} />
      </Suspense>
    </section>
  );
};

export default AccountSetup;
