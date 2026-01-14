import Image from "next/image";
import React from "react";

const ConfirmEmail = () => {
  return (
    <div className="flex flex-col justify-center items-center p-5 rounded-2xl bg-white min-w-[542px] min-h-[246px]">
      <Image
        src="/icons/mark_email_unread.svg"
        height={76}
        width={76}
        alt="email icon"
      />
      <h1 className="text-2xl font-bold text-center">
        Please confirm your email
      </h1>
      <p className="text-[14px] text-center">
        We sent an email to the address you provided.
        <br />
        Just click the link in that email to verify your account.
      </p>
    </div>
  );
};

export default ConfirmEmail;
