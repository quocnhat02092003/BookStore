"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Custom404 = () => {
  React.useEffect(() => {
    document.title = "404 Not Found - BookStoreX";
  }, []);

  return (
    <div className="bg-[url('https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66dedb2084e3ba5c6bf0f230_404%20Page.png')] flex flex-col items-center justify-center px-5 gap-10 h-screen bg-cover bg-center">
      <h1 className="lg:text-[90px] text-7xl font-bold text-center text-green-500">
        404
      </h1>
      <h3 className="text-2xl font-semibold text-center text-white">
        Oops, We can&apos;t seem to find the page what you are looking for.
      </h3>
      <p className="text-center text-white">
        Oops! It looks like the page you&apos;re searching for has taken a
        detour. Let&apos;s guide you back to the heart of PQN
      </p>
      <Link href="/">
        <Button className="w-fit hover:bg-white hover:text-black duration-300">
          Go to Home Page
        </Button>
      </Link>
    </div>
  );
};

export default Custom404;
