import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className=" pt-6 flex flex-col gap-8 w-full h-svh justify-center items-center">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
