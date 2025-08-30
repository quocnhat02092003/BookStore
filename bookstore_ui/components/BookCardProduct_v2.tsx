import Link from "next/link";
import React from "react";

const BookCardProduct_v2 = () => {
  return (
    <Link
      href="/product/1"
      className="md:flex items-center gap-5 p-4 rounded-3xl"
    >
      <img
        src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/6710da0659434f3eefcff5e4_book%20image.png"
        alt=""
        className="w-50 h-60 object-cover rounded-2xl hover:scale-90 transition-transform duration-300"
      />
      <div className="flex flex-col items-start">
        <p className="text-sm text-slate-500 mt-2 truncate w-[180px]">
          By Pham Quoc Nhat nhat nhat nhat nhat naht
        </p>
        <h3 className="text-xl">Dac nhan tam</h3>
        <p className="text-sm text-blue-800 mt-3">100$</p>
      </div>
    </Link>
  );
};

export default BookCardProduct_v2;
