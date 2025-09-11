"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  React.useEffect(() => {
    document.title = "Login | BookStore App";
  }, []);
  return (
    <div className="flex flex-col items-center h-full justify-center bg-neutral-300 gap-5 px-10 xl:rounded-tl-2xl xl:rounded-bl-2xl max-xl:py-20 max-xl:rounded-2xl max-xl:mx-5">
      <img
        src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/671207dc6dd97695b9d61f2a_Logo.png"
        alt="Logo login"
      />
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Email address"
          className="mb-4 px-4 py-2 text-sm border border-black rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 px-4 py-2 text-sm border border-black rounded-lg "
        />
        <Button className="w-fit">Login Now</Button>
      </div>
      <p className="text-sm">Or</p>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full border border-black hover:bg-green-700 duration-300 cursor-pointer">
          <img
            width={20}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
            alt="google logo"
          />
        </button>
        <button className="p-2 rounded-full border border-black hover:bg-green-700 duration-300 cursor-pointer">
          <img
            width={20}
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="facebook logo"
          />
        </button>
      </div>
      <p className="text-sm">
        Don't have an account?{" "}
        <Link href="/register" className=" hover:text-blue-600 duration-300">
          Register
        </Link>
      </p>
    </div>
  );
};

export default page;
