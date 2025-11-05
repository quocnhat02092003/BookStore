import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typedRoutes: true,
   env: {
      API_URL: process.env.API_URL,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
   },
};

export default nextConfig;
