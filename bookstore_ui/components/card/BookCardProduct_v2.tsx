import Link from "next/link";
import React from "react";

interface BookCardProductProps {
  coverImageId: number;
  title: string;
  authors: string[];
  price: number;
  first_publish_year?: number;
  work_id: string;
}

const BookCardProduct_v2: React.FC<BookCardProductProps> = ({
  coverImageId,
  title,
  authors,
  price,
  first_publish_year,
  work_id,
}) => {
  return (
    <Link
      href={`/product/${work_id}`}
      className="md:flex items-center gap-5 p-4 rounded-3xl"
    >
      <img
        src={`https://covers.openlibrary.org/b/id/${coverImageId}-L.jpg`}
        alt=""
        className="w-50 h-60 object-cover rounded-2xl hover:scale-90 transition-transform duration-300"
      />
      <div className="flex flex-col items-start">
        <p className="text-sm text-slate-500 mt-2 truncate w-[180px]">
          By {authors.join(", ")}
        </p>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm text-blue-800 mt-3">${price}</p>
        {first_publish_year && (
          <p className="text-xs text-slate-400 mt-1">
            Published in {first_publish_year}
          </p>
        )}
      </div>
    </Link>
  );
};

export default BookCardProduct_v2;
