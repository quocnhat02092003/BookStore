"use client";
import { Input } from "@/components/ui/input";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React from "react";

const ProductCardOrder = () => {
  return (
    <div className="flex flex-col gap-6 max-xl:mt-4 md:p-10 p-5 bg-slate-100 rounded-lg">
      <h3 className="md:text-3xl text-2xl">YOUR ORDER</h3>
      <div className="flex flex-col gap-4 border p-4 rounded-2xl">
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
          <div>
            <h6>Total</h6>
            <p>$100.00</p>
          </div>
        </div>
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
          <div>
            <h6>Total</h6>
            <p>$100.00</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-b pb-4">
        <p>Vourcher</p>
        <div className="flex flex-row items-center gap-4 mt-2">
          <Input type="text" />
          <button className="bg-green-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-800 duration-300">
            Apply
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between border-b pb-4">
        <p>Subtotal</p>
        <h6 className="text-lg font-bold">$100.00</h6>
      </div>
      <div className="flex flex-row items-center justify-between border-b pb-4">
        <h3 className="text-2xl">Total</h3>
        <h6 className="text-lg font-bold">$100.00</h6>
      </div>
      <div className="flex items-center ">
        <input type="checkbox" id="terms" />
        <label htmlFor="terms" className="text-sm ml-2">
          I agree to the{" "}
          <a href="/terms" className="hover:text-blue-600 duration-300">
            Terms and Conditions
          </a>
        </label>
      </div>
      <div>
        <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 duration-300">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default ProductCardOrder;
