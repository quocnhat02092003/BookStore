import React from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const DescriptionAndDiscount = () => {
  return (
    <div className="xl:grid grid-cols-5 items-center gap-5 text-white lg:mx-20 mb-10 max-xl:space-y-8">
      <div className="flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/6708b1d3e2f73cc8f50dc092_simple-flat-vector-background-with-books-glass%201.png')] bg-cover bg-right h-[600px] max-md:h-[300px] col-span-3 px-20 max-xl:px-8 lg:rounded-4xl">
        <h2 className="text-4xl max-2xl:text-xl font-bold">
          BookShop PhamQuocNhat's Top 5 Most Memorable Moments
        </h2>
        <p className="mt-2 w-[700px] max-xl:w-full max-xl:truncate">
          Explore BookShop PhamQuocNhat's unforgettable highlights, from author
          events to exclusive book launches and community celebrations.
        </p>
        <Button
          variant="default"
          className="cursor-pointer w-fit mt-4 inline-flex items-center"
        >
          <ChevronRight />
          Buy Now
        </Button>
      </div>
      <div className="flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66acbb9d7b5cc1666930eace_Rectangle%20736.png')] h-full max-xl:h-[300px] bg-cover col-span-2 px-20 lg:rounded-4xl max-xl:px-8">
        <h2 className="text-4xl max-2xl:text-xl font-bold">Big Discount</h2>
        <p className="mt-2 w-[500px]">50% Discount for new users</p>
        <Button
          variant="default"
          className="cursor-pointer w-fit mt-4 bg-white text-black hover:bg-white inline-flex items-center"
        >
          <ChevronRight />
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default DescriptionAndDiscount;
