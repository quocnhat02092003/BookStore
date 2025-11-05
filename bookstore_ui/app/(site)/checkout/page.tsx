"use client";
import ProductCardOrder from "@/components/features/checkout/ProductCardOrder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { GetAllOrders } from "@/service/OrderService";
import { OrderType } from "@/type/ResponseType/OrderType";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CheckoutPage = () => {
  const { user } = useUser();

  const router = useRouter();

  const [orderItems, setOrderItems] = React.useState<OrderType | null>(null);

  React.useEffect(() => {
    document.title = "Checkout - BookStoreX";
    const fetchDataAllOrders = async () => {
      try {
        const response = await GetAllOrders();
        console.log("All Orders:", response);
        setOrderItems(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
        router.push("/cart");
      }
    };
    fetchDataAllOrders();
  }, []);

  return (
    <div className="w-full">
      <Button
        className="ml-5 mt-5"
        variant={"link"}
        onClick={() => router.push("/cart")}
      >
        <ArrowLeft /> Back to Cart
      </Button>
      <div className="lg:grid grid-cols-12 gap-10 items-center justify-center 2xl:px-60 lg:px-20 px-10 py-5">
        <div className="col-span-4 w-full">
          <div className="flex flex-col gap-6 mb-10">
            <h3 className="text-3xl">CHECKOUT</h3>
            <h6 className="text-lg">BILLING DETAILS</h6>
            <form className="flex flex-col gap-4 max-w-md">
              <div className="flex flex-col gap-2">
                <label htmlFor="Email">Email</label>
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
                <label htmlFor="Name">Name</label>
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
                <label htmlFor="StreetAddress">Street Address</label>
                <Input
                  type="text"
                  id="StreetAddress"
                  name="StreetAddress"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="City">City</label>
                <Input type="text" id="City" name="City" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="State">State/Province</label>
                <Input type="text" id="State" name="State" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ZipCode">Zip/Postal Code</label>
                <Input type="text" id="ZipCode" name="ZipCode" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Country">Country</label>
                <Input type="text" id="Country" name="Country" required />
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl">Shipping Address</h3>
            <h6 className="text-lg">SHIPPING DETAILS</h6>
            <form className="flex flex-col gap-4 max-w-md">
              <div className="flex flex-col gap-2">
                <label htmlFor="Fullname">Fullname</label>
                <Input
                  defaultValue={user?.fullName}
                  type="text"
                  id="Fullname"
                  name="Fullname"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="StreetAddress">Street Address</label>
                <Input
                  type="text"
                  id="StreetAddress"
                  name="StreetAddress"
                  required
                />
              </div>
              <div className="lg:flex gap-4 max-lg:space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="City">City</label>
                  <Input type="text" id="City" name="City" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="State">State/Province</label>
                  <Input type="text" id="State" name="State" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="ZipCode">Zip/Postal Code</label>
                  <Input type="text" id="ZipCode" name="ZipCode" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Country">Country</label>
                <Input type="text" id="Country" name="Country" required />
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-8">
          <ProductCardOrder data={orderItems} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
