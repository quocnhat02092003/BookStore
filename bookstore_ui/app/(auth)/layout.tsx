import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-x-hidden">
      <Link
        href="/"
        className="absolute top-5 left-5 inline-flex items-center gap-1 text-white text-sm hover:text-blue-300 duration-300"
      >
        <ChevronLeft />
        Home
      </Link>
      <div className="bg-[url('https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/670f8f7633fbee26a9cb29cf_image%20(2).png')] py-20 min-h-screen flex justify-center items-center">
        <div className="flex flex-row items-stretch justify-center">
          <div className="flex-1">{children}</div>
          <div className="max-xl:hidden flex-1 rounded-tr-2xl overflow-hidden rounded-br-2xl">
            <img
              loading="lazy"
              src="https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg?cs=srgb&dl=pexels-tirachard-kumtanom-112571-733857.jpg&fm=jpg" // Đường dẫn đến hình ảnh
              alt="Login"
              className="object-cover w-[600px] h-[600px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
