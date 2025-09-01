import React from "react";
import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";

const BigDiscount = () => {
  return (
    <div className="flex flex-col justify-center items-end bg-[url('https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66ffc1a5c49c28bb3bdee817_image.png')] bg-cover bg-center h-[700px] max-xl:h-[400px] col-span-3 px-20 max-xl:px-8 xl:rounded-4xl text-white lg:mx-20 my-20">
      <h2 className="text-4xl max-2xl:text-xl font-bold">
        Get 50% discount on your first order!
      </h2>
      <p className="mt-2 w-[700px] max-xl:w-full max-xl:truncate">
        Discover affordable reads under $50 at BookStore PhamQuocNhat! From
        gripping mysteries to heartwarming romances.
      </p>
      <Button
        variant="default"
        className="cursor-pointer bg-white text-black hover:bg-white w-fit mt-4 inline-flex items-center"
      >
        Order Now
        <ChevronRight />
      </Button>
    </div>
  );
};

export default BigDiscount;
