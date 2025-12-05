import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import React from "react";

const BlogCard = () => {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Ảnh */}
      <Link href="/about" className="block overflow-hidden">
        <Image
          unoptimized
          src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/66ab8282560ac2178fdcc7a8_image%20(2).avif"
          alt="Blog Image"
          width={600}
          height={400}
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Nội dung */}
      <div className="p-5 flex flex-col">
        <Link
          href="/blog"
          className="text-xs font-medium text-green-700 border border-green-600 px-3 py-1 rounded-full w-fit hover:bg-green-600 hover:text-white transition"
        >
          Books
        </Link>

        <span className="lg:text-2xl text-xl mt-3 text-slate-800">
          The Ultimate Guide to Building a Cozy Reading Nook at Home
        </span>

        <Link
          href="/blog"
          className="text-sm text-blue-700 mt-4 inline-flex items-center font-medium hover:underline"
        >
          Read more
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
