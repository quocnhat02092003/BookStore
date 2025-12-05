"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { BillingType } from "@/type/RequestType/BillingType";
import { ShippingType } from "@/type/RequestType/ShippingType";
import {
  SaveBillingAddressCheckout,
  SaveShippingAddressCheckout,
} from "@/service/CheckoutService";
import { enqueueSnackbar } from "notistack";
import ProductCardOrderV2 from "@/components/features/checkout/ProductCardOrderV2";
import Link from "next/link";

const CheckoutPage = () => {
  const { user } = useUser();

  const router = useRouter();

  const [billingAddress, setBillingAddress] = React.useState<BillingType>({
    email: user?.email || "",
    name: user?.fullName || "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [shippingAddress, setShippingAddress] = React.useState<ShippingType>({
    fullName: user?.fullName || "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.title = "Checkout - BookStoreX";
  }, []);

  const handleSaveAddressAndContinueToPayment = () => {
    toast.warning(
      "Are you sure you want to continue to payment and confirm this address?",
      {
        action: {
          label: "Yes, Continue",
          onClick: async () => {
            try {
              const responseBillingAddress = await SaveBillingAddressCheckout(
                billingAddress
              );
              const responseShippingAddress = await SaveShippingAddressCheckout(
                shippingAddress
              );
              if (
                responseBillingAddress.status === 200 &&
                responseShippingAddress.status === 200
              ) {
                enqueueSnackbar("Billing address saved successfully", {
                  variant: "success",
                });
                setTimeout(() => {
                  router.push("/checkout/payment");
                }, 1500);
              }
            } catch (error) {
              enqueueSnackbar("Failed to save addresses", {
                variant: "error",
              });
            }
          },
        },
      }
    );
  };

  // Update when user loaded
  React.useEffect(() => {
    if (user) {
      setBillingAddress((prev) => ({
        ...prev,
        email: user.email || "",
        name: user.fullName || "",
      }));
      setShippingAddress((prev) => ({
        ...prev,
        fullName: user.fullName || "",
      }));
    }
  }, [user]);

  return (
    <div className="w-full">
      <Button
        className="ml-5 mt-5"
        variant={"link"}
        onClick={() => router.push("/cart")}
      >
        <ArrowLeft /> Back to Cart
      </Button>
      <div className="flex lg:flex-row flex-col gap-10 border border-slate-300 rounded-lg lg:mx-20 lg:my-10 mx-5 my-5 lg:px-10 px-5 ">
        <div className="flex flex-col gap-6 py-10 lg:w-1/2 lg:border-r lg:pr-10 px-5">
          <h3 className="text-3xl">Checkout</h3>
          <h6 className="text-lg">BILLING DETAILS</h6>
          <div className="flex flex-col gap-4">
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
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    email:
                      e.target.value === ""
                        ? user?.email || ""
                        : e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    name: user?.fullName || "",
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="StreetAddress">
                Street Address <span className="text-red-800">*</span>
              </label>
              <Input
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    streetAddress: e.target.value,
                  })
                }
                type="text"
                id="StreetAddress"
                name="StreetAddress"
                required
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="City">
                City <span className="text-red-800">*</span>
              </label>
              <Input
                type="text"
                id="City"
                name="City"
                required
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, city: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="State">
                State/Province <span className="text-red-800">*</span>
              </label>
              <Input
                type="text"
                id="State"
                name="State"
                required
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    state: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="ZipCode">
                Zip/Postal Code <span className="text-red-800">*</span>
              </label>
              <Input
                type="text"
                id="ZipCode"
                name="ZipCode"
                required
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    zipCode: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Country">
                Country <span className="text-red-800">*</span>
              </label>
              <Input
                type="text"
                id="Country"
                name="Country"
                required
                onChange={(e) =>
                  setBillingAddress({
                    ...billingAddress,
                    country: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 py-10 px-5">
          <h3 className="text-3xl">Shipping Address</h3>
          <h6 className="text-lg">SHIPPING DETAILS</h6>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="Fullname">
                Fullname <span className="text-red-800">*</span>
              </label>
              <Input
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    fullName: user?.fullName || e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    streetAddress: e.target.value,
                  })
                }
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
                <Input
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  type="text"
                  id="City"
                  name="City"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="State">
                  State/Province <span className="text-red-800">*</span>
                </label>
                <Input
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      state: e.target.value,
                    })
                  }
                  type="text"
                  id="State"
                  name="State"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ZipCode">
                  Zip/Postal Code <span className="text-red-800">*</span>
                </label>
                <Input
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      zipCode: e.target.value,
                    })
                  }
                  type="text"
                  id="ZipCode"
                  name="ZipCode"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Country">
                Country <span className="text-red-800">*</span>
              </label>
              <Input
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                type="text"
                id="Country"
                name="Country"
                required
              />
            </div>
            <div className="mt-10 space-y-5">
              <ProductCardOrderV2 />
              <div className="flex items-center ">
                <input
                  type="checkbox"
                  id="terms"
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm ml-2">
                  I agree to the{" "}
                  <Link
                    href="/about"
                    className="hover:text-blue-800 duration-300 text-blue-500"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              <Button
                disabled={
                  !billingAddress.streetAddress ||
                  !billingAddress.city ||
                  !billingAddress.state ||
                  !billingAddress.zipCode ||
                  !billingAddress.country ||
                  !shippingAddress.fullName ||
                  !shippingAddress.streetAddress ||
                  !shippingAddress.city ||
                  !shippingAddress.state ||
                  !shippingAddress.zipCode ||
                  !shippingAddress.country ||
                  !termsAccepted
                }
                variant="default"
                onClick={handleSaveAddressAndContinueToPayment}
                className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 duration-300"
              >
                PLACE ORDER
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
