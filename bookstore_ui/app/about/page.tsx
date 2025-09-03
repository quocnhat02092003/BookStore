import BigDiscount from "@/components/features/home/BigDiscount";
import { Button } from "@/components/ui/button";
import { ChevronRight, CircleCheck } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="lg:flex flex-row items-center px-40 2xl:gap-32 gap-20 lg:py-20 py-10 max-2xl:px-10">
        <div className="relative lg:w-[900px] w-[60vw] ">
          <img
            src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66b325f348e61244ebf150e0_Rectangle%20769-p-800.png"
            alt="image"
          />
          <div className="absolute -bottom-10 -right-10 lg:w-[300px] w-[40vw] h-auto">
            <img
              src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66b325f36164f5ffa25df020_Rectangle%20770.png"
              alt="image"
            />
          </div>
        </div>
        <div className="lg:flex flex-col gap-10 max-lg:mt-20 space-y-5">
          <p className="text-green-800">
            WELCOME TO BOOKSTORE PQN{" "}
            <span className="text-slate-400">(Founded 1999)</span>
          </p>
          <h1 className="2xl:text-7xl text-4xl">
            Discover the Story Behind BookStore PQN
          </h1>
          <p>
            BookStore PQN is a haven for book lovers, offering a curated
            selection of literary treasures. Our mission is to connect readers
            with the stories that resonate with them, fostering a community of
            bookworms and storytellers.
          </p>
          <div className="lg:grid grid-cols-2 gap-5 max-lg:space-y-2">
            <p className="flex items-center gap-2">
              <CircleCheck className="bg-black text-white rounded-full" /> Best
              Book Seller
            </p>
            <p className="flex items-center gap-2">
              <CircleCheck className="bg-black text-white rounded-full" /> 24k+
              Books
            </p>
            <p className="flex items-center gap-2">
              <CircleCheck className="bg-black text-white rounded-full" /> On
              Time Delivery
            </p>
            <p className="flex items-center gap-2">
              <CircleCheck className="bg-black text-white rounded-full" /> Good
              Customer Feedback
            </p>
          </div>
          <Button className="w-fit" variant="default">
            Get Started
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="text-center mt-10">
        <h2 className="lg:text-5xl text-4xl font-bold mb-4">Watch Our Story</h2>
        <p className="pt-5">
          Empowering communities through diverse books, exceptional service, and
          enriching literary experiences at BookStore PQN.
        </p>
        <video className="mx-auto px-10 py-10" autoPlay loop muted playsInline>
          <source
            src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8%2F66b3406e0acb4ac82119fc67_-c8db-4d70-9ab5-34e69e6ee9f4-transcode.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <BigDiscount />
    </div>
  );
};

export default page;
