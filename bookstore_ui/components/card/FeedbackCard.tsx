import Link from "next/link";
import React from "react";

const FeedbackCard = () => {
  return (
    <div className="bg-white p-10 rounded-lg">
      <Link href="/">
        <p className="text-lg text-start">
          Bookshop PQN is my go-to place for all my academic needs. Their staffs
          always help me.
        </p>
        <div className="flex justify-start flex-row-reverse mt-5 gap-4 ml-4">
          <img
            src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/6710d687b852284eb2a703b2_Rectangle%20756-2.avif"
            alt=""
            className="w-[50px] h-[50px] object-cover rounded-full"
          />
          <div className="flex flex-col items-start gap-1">
            <p>John Doe</p>
            <small>Customer</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeedbackCard;
