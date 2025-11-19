"use client";
import ProductCardOrder from "@/components/features/checkout/ProductCardOrder";
import { Button } from "@/components/ui/button";
import { CancelCheckout } from "@/service/CheckoutService";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();

  React.useEffect(() => {
    document.title = "Payment - BookStoreX";
  }, []);

  const handleCancelCheckout = () => {
    toast.warning("Are you sure you want to cancel the checkout?", {
      action: {
        label: "Yes, Cancel",
        onClick: async () => {
          try {
            const response = await CancelCheckout();
            if (response.status === 200) {
              enqueueSnackbar("Checkout session cancelled successfully", {
                variant: "success",
              });
              setTimeout(() => {
                router.push("/cart");
              }, 1500);
            }
          } catch (error) {
            enqueueSnackbar("Failed to cancel checkout session", {
              variant: "error",
            });
          }
        },
      },
    });
  };
  return (
    // <div className="w-full">
    <div className="flex flex-col items-center my-5">
      <div className="border border-slate-500 space-y-5 rounded-2xl p-5 flex flex-col items-center">
        <img
          className="w-60"
          src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/671207dc6dd97695b9d61f2a_Logo.png"
          alt=""
        />
        <div className="w-full border-b border-slate-300 pb-2"></div>
        <ProductCardOrder />
        <Button onClick={handleCancelCheckout} variant="outline">
          Cancel Order
        </Button>
      </div>
    </div>
    // </div>
  );
};

export default page;
