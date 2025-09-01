import { LaptopMinimalCheck, ShieldCheck, Truck } from "lucide-react";
import React from "react";

const ShipDetailHome = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:grid-cols-1 items-center justify-center gap-10 my-20 lg:px-40 max-lg:px-10">
      <div className="flex flex-row items-center gap-2">
        <Truck size={50} />
        <div>
          <h3>Delivery in 2 Days</h3>
          <p>Get your books delivered to your doorstep in just 2 days!</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 xl:border-l-2 xl:border-black xl:pl-10">
        <LaptopMinimalCheck size={50} />
        <div>
          <h3>Free Shipping</h3>
          <p>Enjoy free shipping on all orders over $50!</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 xl:border-l-2 xl:border-black xl:pl-10">
        <ShieldCheck size={50} />
        <div>
          <h3>100% Secure Payment</h3>
          <p>Your payment information is safe and secure.</p>
        </div>
      </div>
    </div>
  );
};

export default ShipDetailHome;
