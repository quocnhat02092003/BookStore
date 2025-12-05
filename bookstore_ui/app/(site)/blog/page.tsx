"use client";
import BlogCard from "@/components/card/BlogCard";
import React from "react";

const BlogPage = () => {
  React.useEffect(() => {
    document.title = "Blog - BookStoreX";
  }, []);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-5 mt-20 xl:px-40 px-10">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
};

export default BlogPage;
