"use client";
import { Button } from "@/components/ui/button";
import { VerifyPaymentCheckout } from "@/service/CheckoutService";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ReturnPage = () => {
  const router = useRouter();
  const [session_id, setSessionId] = React.useState<string | null>(null);

  React.useEffect(() => {
    document.title = "Return Page";
    const id = new URLSearchParams(window.location.search).get("session_id");
    setSessionId(id);
    const verifyPayment = async () => {
      try {
        const response = await VerifyPaymentCheckout(id);
        console.log("Payment verification response:", response);
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };
    verifyPayment();
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

export default ReturnPage;
