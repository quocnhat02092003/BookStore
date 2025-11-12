"use client";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  React.useEffect(() => {
    document.title = "Return Page";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-4">
      <BadgeCheck className="text-green-500" size={"100px"} />
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-4xl font-bold">Payment Successfully</h1>
        <Button onClick={() => router.push("/")} variant="outline">
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default page;
