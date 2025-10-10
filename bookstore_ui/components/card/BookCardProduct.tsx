import Link from "next/link";
import React from "react";

interface BookCardProductProps {
  authors: string[];
  title: string;
  price: number;
  coverImageId: number;
  first_publish_year?: number;
  work_id: string;
}

const BookCardProduct = ({
  authors,
  title,
  price,
  coverImageId,
  first_publish_year,
  work_id,
}: BookCardProductProps) => {
  return (
    <Link
      href={`/product/${work_id}`}
      className="flex flex-col items-start w-full truncate"
    >
      <img
        src={`https://covers.openlibrary.org/b/id/${coverImageId}-L.jpg`}
        alt=""
        className="w-full h-100 object-cover hover:scale-90 transition-transform duration-300 rounded-md"
      />
      <div className="flex flex-col items-start truncate">
        <p className="text-sm text-slate-500 mt-2 truncate">
          By {authors ? authors.join(", ") : "Unknown Author"}
        </p>
        <h3 className="text-lg truncate">{title}</h3>
        <p className="text-sm text-blue-800 mt-1">${price} USD</p>
        {first_publish_year && (
          <p className="text-xs text-slate-400 mt-1">
            Published in {first_publish_year}
          </p>
        )}
      </div>
    </Link>
  );
};

export default BookCardProduct;
