import ProductCardOrder from "@/components/features/checkout/ProductCardOrder";
import { Input } from "@/components/ui/input";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="lg:flex flex-row items-start justify-between gap-10 2xl:px-60 lg:px-20 px-10 py-10">
      <div>
        <div className="flex flex-col gap-6 mb-10">
          <h3 className="text-3xl">CHECKOUT</h3>
          <h6 className="text-lg">BILLING DETAILS</h6>
          <form className="flex flex-col gap-4 max-w-md">
            <div className="flex flex-col">
              <label htmlFor="Email">Email</label>
              <Input type="email" id="Email" name="Email" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Name">Name</label>
              <Input type="text" id="Name" name="Name" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="StreetAddress">Street Address</label>
              <Input
                type="text"
                id="StreetAddress"
                name="StreetAddress"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="City">City</label>
              <Input type="text" id="City" name="City" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="State">State/Province</label>
              <Input type="text" id="State" name="State" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="ZipCode">Zip/Postal Code</label>
              <Input type="text" id="ZipCode" name="ZipCode" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Country">Country</label>
              <Input type="text" id="Country" name="Country" required />
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-3xl">Shipping Address</h3>
          <h6 className="text-lg">SHIPPING DETAILS</h6>
          <form className="flex flex-col gap-4 max-w-md">
            <div className="flex flex-col">
              <label htmlFor="Fullname">Fullname</label>
              <Input type="text" id="Fullname" name="Fullname" required />
            </div>
            <div className="flex flex-col">
              <label htmlFor="StreetAddress">Street Address</label>
              <Input
                type="text"
                id="StreetAddress"
                name="StreetAddress"
                required
              />
            </div>
            <div className="lg:flex gap-4 max-lg:space-y-4">
              <div className="flex flex-col">
                <label htmlFor="City">City</label>
                <Input type="text" id="City" name="City" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="State">State/Province</label>
                <Input type="text" id="State" name="State" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="ZipCode">Zip/Postal Code</label>
                <Input type="text" id="ZipCode" name="ZipCode" required />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="Country">Country</label>
              <Input type="text" id="Country" name="Country" required />
            </div>
          </form>
        </div>
      </div>
      <ProductCardOrder />
    </div>
  );
};

export default CheckoutPage;
