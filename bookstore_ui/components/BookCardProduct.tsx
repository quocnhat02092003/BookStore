import Link from "next/link";
import React from "react";

const BookCardProduct = () => {
  return (
    <Link href="/product/1">
      <img
        src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/6710da0659434f3eefcff5e4_book%20image.png"
        alt=""
        className="w-80 h-auto object-cover p-2 shadow-md rounded-2xl hover:scale-90 transition-transform duration-300"
      />
      <div className="flex flex-col items-start truncate">
        <p className="text-sm text-slate-500 mt-2">By Pham Quoc Nhat </p>
        <h3 className="text-xl">Dac nhan tam</h3>
        <p className="text-sm text-blue-800 mt-3">100$</p>
      </div>
    </Link>
  );
};

export default BookCardProduct;
