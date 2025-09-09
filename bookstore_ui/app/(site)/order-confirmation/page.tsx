import { Button } from "@/components/ui/button";
import React from "react";

const OrderConfirmationPage = () => {
  return (
    <div className="lg:flex items-center justify-center gap-40 max-xl:mt-4 md:p-10 p-5 rounded-lg">
      <div className="space-y-5">
        <h4 className="text-3xl">Thank you. Your order has been received</h4>
        <div className="space-y-2">
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-lg">Email:</p>
            <p>example@gmail.com</p>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-lg">Total:</p>
            <p>$100.00</p>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-lg">Card Provider:</p>
            <p>Visa 4242</p>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-lg">Card Expiry Date:</p>
            <p>12/34</p>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-lg">City:</p>
            <p>New York</p>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-lg">Address:</p>
            <p>123 Main St</p>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-lg">Shipping method:</p>
            <p>Standard Shipping</p>
          </div>
        </div>
        <div className="text-center">
          <Button className="w-fit">Go to Order Management</Button>
        </div>
      </div>
      <div className="space-y-5 max-lg:mt-10 border px-10 py-10 rounded-lg">
        <h3 className="text-3xl">Order Details</h3>
        <div className="md:flex flex-row items-center gap-32 rounded-lg max-md:space-y-4">
          <div className="md:flex flex-row items-center gap-4 max-md:space-y-4">
            <img
              src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/6710dad340a77e5ff46764c3_book%20image-11.png"
              alt=""
              className="w-30 h-40 object-cover rounded-lg"
            />
            <div className="w-[200px] ">
              <p className="font-bold truncate">
                Product Name product name name name{" "}
              </p>
              <small>Items : 1</small>
            </div>
          </div>
          <p>$100.00</p>
        </div>
        <div className="flex flex-row items-center justify-between border-b pb-4">
          <p>Subtotal</p>
          <h6 className="text-lg font-bold">$100.00</h6>
        </div>
        <div className="flex flex-row items-center justify-between pb-4">
          <h3 className="text-2xl">Total</h3>
          <h6 className="text-lg font-bold">$100.00</h6>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
