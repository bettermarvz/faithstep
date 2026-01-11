import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center gap-4">
      <h1 className="text-6xl">Page Not Found</h1>
      <Link href="/overview">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
