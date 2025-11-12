"use client";
import ProductCardOrder from "@/components/features/checkout/ProductCardOrder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { CancelCheckout } from "@/service/CheckoutService";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";

const CheckoutPage = () => {
  const { user } = useUser();

  const router = useRouter();

  React.useEffect(() => {
    document.title = "Checkout - BookStoreX";
  }, []);

  const handleCancelCheckout = async () => {
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
    <div className="w-full">
      <Button
        className="ml-5 mt-5"
        variant={"link"}
        onClick={() => router.push("/cart")}
      >
        <ArrowLeft /> Back to Cart
      </Button>
      <div className="lg:flex flex-row flex-wrap justify-center gap-10 lg:px-20 px-10 py-5">
        <div className="col-span-4">
          <div className="flex flex-col gap-6 mb-10">
            <h3 className="text-3xl">CHECKOUT</h3>
            <h6 className="text-lg">BILLING DETAILS</h6>
            <form className="flex flex-col gap-4 max-w-md">
              <div className="flex flex-col gap-2">
                <label htmlFor="Email">
                  Email <span className="text-red-800">*</span>
                </label>
                <Input
                  defaultValue={user?.email}
                  disabled
                  type="email"
                  id="Email"
                  name="Email"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Name">
                  Name <span className="text-red-800">*</span>
                </label>
                <Input
                  disabled
                  defaultValue={user?.fullName}
                  type="text"
                  id="Name"
                  name="Name"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="StreetAddress">
                  Street Address <span className="text-red-800">*</span>
                </label>
                <Input
                  type="text"
                  id="StreetAddress"
                  name="StreetAddress"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="City">
                  City <span className="text-red-800">*</span>
                </label>
                <Input type="text" id="City" name="City" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="State">
                  State/Province <span className="text-red-800">*</span>
                </label>
                <Input type="text" id="State" name="State" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ZipCode">
                  Zip/Postal Code <span className="text-red-800">*</span>
                </label>
                <Input type="text" id="ZipCode" name="ZipCode" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Country">
                  Country <span className="text-red-800">*</span>
                </label>
                <Input type="text" id="Country" name="Country" required />
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl">Shipping Address</h3>
            <h6 className="text-lg">SHIPPING DETAILS</h6>
            <form className="flex flex-col gap-4 max-w-md">
              <div className="flex flex-col gap-2">
                <label htmlFor="Fullname">
                  Fullname <span className="text-red-800">*</span>
                </label>
                <Input
                  defaultValue={user?.fullName}
                  type="text"
                  id="Fullname"
                  name="Fullname"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="StreetAddress">
                  Street Address <span className="text-red-800">*</span>
                </label>
                <Input
                  type="text"
                  id="StreetAddress"
                  name="StreetAddress"
                  required
                />
              </div>
              <div className="lg:flex gap-4 max-lg:space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="City">
                    City <span className="text-red-800">*</span>
                  </label>
                  <Input type="text" id="City" name="City" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="State">
                    State/Province <span className="text-red-800">*</span>
                  </label>
                  <Input type="text" id="State" name="State" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="ZipCode">
                    Zip/Postal Code <span className="text-red-800">*</span>
                  </label>
                  <Input type="text" id="ZipCode" name="ZipCode" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Country">
                  Country <span className="text-red-800">*</span>
                </label>
                <Input type="text" id="Country" name="Country" required />
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center">
          <ProductCardOrder />
          <Button onClick={() => handleCancelCheckout()} variant="outline">
            Cancel Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
