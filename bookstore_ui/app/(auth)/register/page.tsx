"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  React.useEffect(() => {
    document.title = "Register | BookStore App";
  }, []);

  // Form state

  return (
    <div className="flex flex-col items-center h-full justify-center bg-gradient-to-b from-blue-200 to-cyan-300 gap-5 px-10 xl:rounded-tl-2xl xl:rounded-bl-2xl max-xl:py-20 max-xl:rounded-2xl max-xl:mx-5">
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="mb-4 px-4 py-2 text-sm border border-black rounded-lg "
        />
        <div className="flex items-center mb-4">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms" className="text-sm ml-2">
            I agree to the{" "}
            <Link href="/terms" className="hover:text-blue-600 duration-300">
              Terms and Conditions
            </Link>
          </label>
        </div>

        <Button className="w-fit">Register Now</Button>
      </div>
      <p className="text-sm">Or</p>
      <div className="flex flex-col items-center gap-2">
        <button className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg border border-black hover:bg-green-700 hover:text-white duration-300 cursor-pointer text-sm">
          <img
            width={20}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
            alt="google logo"
          />
          Login with Google
        </button>
        <button
          onClick={() => alert("Developing...")}
          className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg border border-black hover:bg-blue-700 hover:text-white duration-300 cursor-pointer text-sm"
        >
          <img
            width={20}
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="facebook logo"
          />
          Login with Facebook
        </button>
      </div>
      <p className="text-sm">
        Have an account?{" "}
        <Link href="/login" className=" hover:text-blue-600 duration-300">
          Login
        </Link>
      </p>
    </div>
  );
};

export default page;
