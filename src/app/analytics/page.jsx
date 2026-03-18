import React from "react";
import { Analytics } from "@vercel/analytics/next";

const Page = () => {
  return (
    <div className="w-full flex items-center h-screen justify-center">
      <Analytics />
    </div>
  );
};

export default Page;
