"use client";
import { OrderType } from "@/type/ResponseType/OrderType";
import React from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CreateCheckoutSession } from "@/service/CheckoutService";

interface ProductCardOrderProps {
  data: OrderType | null;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const ProductCardOrder = ({ data }: ProductCardOrderProps) => {
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleCheckout = async () => {
      const res = await CreateCheckoutSession();
      setClientSecret(res.clientSecret);
    };
    handleCheckout();
  }, []);

  console.log("Client Secret:", clientSecret);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default ProductCardOrder;
