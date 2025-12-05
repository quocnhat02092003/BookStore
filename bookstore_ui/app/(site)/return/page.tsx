"use client";
import { Button } from "@/components/ui/button";
import { VerifyPaymentCheckout } from "@/service/CheckoutService";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ReturnPage = () => {
  const router = useRouter();

  const session_id = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  console.log("Session ID:", session_id);

  React.useEffect(() => {
    document.title = "Return Page";
    const verifyPayment = async () => {
      try {
        const response = await VerifyPaymentCheckout(session_id);
        console.log("Payment verification response:", response);
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };
    verifyPayment();
  }, [session_id]);

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
