import Link from "next/link";
import React from "react";

const AuthorCard = () => {
  return (
    <Link href="/author/1">
      <div className="overflow-hidden">
        <img
          src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/6710d687b852284eb2a703b2_Rectangle%20756-2.avif"
          alt=""
          className="h-auto object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col items-center truncate">
        <h3 className="text-xl mt-5">John Doe</h3>
        <p className="text-sm mt-3">18 published books</p>
      </div>
    </Link>
  );
};

export default AuthorCard;
