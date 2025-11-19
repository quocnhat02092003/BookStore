import Link from "next/link";
import React from "react";

interface BookCardProductProps {
  coverImageId: number;
  title: string;
  authors: { author_key: string; name: string }[];
  price: number;
  first_publish_year?: number;
  product_id: string;
}

const BookCardProduct_v2: React.FC<BookCardProductProps> = ({
  coverImageId,
  title,
  authors,
  price,
  first_publish_year,
  product_id,
}) => {
  return (
    <Link
      href={`/product/${product_id}`}
      className="
        flex items-center gap-3 w-full
        rounded-xl border border-gray-200 bg-white
        px-3 py-2
        hover:bg-gray-50 hover:shadow-sm
        transition-all duration-200
      "
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0">
        <img
          src={`https://covers.openlibrary.org/b/id/${coverImageId}-L.jpg`}
          alt={title}
          className="w-40 h-48 object-cover rounded-md"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-md font-semibold text-gray-900 truncate">
          {title}
        </span>
        <p className="text-xs text-gray-500 truncate">
          {authors.map((a) => a.name).join(", ")}
        </p>

        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-bold text-blue-700">${price}</span>
          {first_publish_year && (
            <span className="text-[11px] text-gray-400">
              {first_publish_year}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCardProduct_v2;
