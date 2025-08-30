import React from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import BookCardProduct_v2 from "./BookCardProduct_v2";

const ExploreOurHome = () => {
  return (
    <div>
      <div className="flex flex-row justify-around items-center gap-10 my-20 mx-10">
        <h2 className="text-7xl max-lg:text-4xl font-bold">
          Explore Our Kids' Books
        </h2>
        <Button size="lg">
          Explore All <ChevronRight />
        </Button>
      </div>
      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 gap-20 px-20 mb-20">
        <BookCardProduct_v2 />
        <BookCardProduct_v2 />
        <BookCardProduct_v2 />
        <BookCardProduct_v2 />
      </div>
    </div>
  );
};

export default ExploreOurHome;
