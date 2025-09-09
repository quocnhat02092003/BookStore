import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const BlogCard = () => {
  return (
    <Link href="/product/1">
      <div className="overflow-hidden">
        <img
          src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/66ab8282560ac2178fdcc7a8_image%20(2).avif"
          alt=""
          className=" object-cover hover:scale-105 duration-300"
        />
      </div>
      <div className="flex flex-col items-start truncate bg-gray-200 py-3 px-5 rounded-b-lg">
        <Link
          href="blog-category/books"
          className="text-sm text-slate-500 mt-2 px-2 py-1 border border-green-600 rounded-xl hover:bg-green-600 hover:text-white duration-300"
        >
          Books
        </Link>
        <h3 className="lg:text-2xl text-xl mt-3">Dac nhan tam</h3>
        <Link
          href="/blog/1"
          className="text-sm text-blue-800 my-3 inline-flex items-center"
        >
          Read more <ChevronRight />
        </Link>
      </div>
    </Link>
  );
};

export default BlogCard;
