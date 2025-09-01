import { Facebook, Github, Headset, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white pt-24">
      <div className="lg:flex justify-between px-16 max-lg:px-6">
        <div className="flex flex-col gap-5 max-lg:border-b max-lg:border-white max-lg:pb-5">
          <img
            src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/671207dc18ddee7a77f68f8c_Logo%20(1).png"
            alt="Logos"
            width="200"
          />
          <p>
            A Captivating Journey Blending Mystery, <br />
            Fantasy, and Adventure for Readers.
          </p>
          <div className="flex flex-col gap-2">
            <p className="inline-flex gap-2">
              <Headset /> Call: (+84) 796 704 249
            </p>
            <p className="inline-flex gap-2">
              <Mail /> quocnhat02092003@gmail.com
            </p>
          </div>
        </div>
        <div className="flex gap-20 max-sm:flex-col max-sm:gap-8 max-lg:pt-8 max-lg:border-b max-lg:border-white max-lg:pb-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl pb-5">Helpful Links</h2>
            <h3 className="text-lg">
              <Link href="/">Home</Link>
            </h3>
            <h3 className="text-lg">
              <Link href="/">About me</Link>
            </h3>
            <h3 className="text-lg">
              <Link href="/">FAQ</Link>
            </h3>
            <h3 className="text-lg">
              <Link href="/">Blog</Link>
            </h3>
            <h3 className="text-lg">
              <Link href="/">Shop</Link>
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl pb-5">Pages</h2>
            <h3 className="text-lg">
              <Link href="/">Sign-Up</Link>
            </h3>
            <h3 className="text-lg">
              <Link href="/">Shop List</Link>
            </h3>
            <h3 className="text-lg">
              <Link href="/">Contact Us</Link>
            </h3>
            <h3 className="text-lg">
              <Link href="/">404 Page</Link>
            </h3>
            <h3 className="text-lg">
              <Link href="/">Licensing</Link>
            </h3>
          </div>
        </div>
        <div className="max-lg:pt-8 flex flex-col gap-5">
          <div>
            <h2 className="text-2xl pb-5">Stay connected</h2>
            <Input placeholder="Enter your email" className="bg-white" />
          </div>
          <div className="flex flex-col ">
            <h2 className="text-2xl pb-5">Social Community</h2>
            <div className="flex gap-4">
              <Link href="/" className="border border-white p-3 rounded-full">
                <Facebook />
              </Link>
              <Link href="/" className="border border-white p-3 rounded-full">
                <Linkedin />
              </Link>
              <Link href="/" className="border border-white p-3 rounded-full">
                <Github />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-10 lg:py-5 max-lg:py-3 px-2 border-t border-white">
        © 2025 BookStore. Designed with Pham Quoc Nhat. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
