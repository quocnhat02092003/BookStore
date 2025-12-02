"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BookCardProduct_v2 from "@/components/card/BookCardProduct_v2";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getProductsBySearchQuery } from "@/service/ProductService";
import { ProductType } from "@/type/ResponseType/ProductType";

const SearchBookPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType>();

  document.title = "Search Books - BookStore";

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    document.title = `Search results for "${query}" - BookStore`;
    try {
      setLoading(true);
      const response = await getProductsBySearchQuery(query);
      if (response.status === 200) {
        setProducts(response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-20 lg:px-40 py-14">
      <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 text-center">
        Search Books
      </h1>
      <p className="text-gray-500 text-center mt-2">
        Find books by title, category or author.
      </p>
      <div className="flex justify-center mt-10">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 w-full max-w-3xl bg-white/60 backdrop-blur-xl 
          border border-gray-300 rounded-full px-6 py-4 shadow-sm hover:shadow-md transition-all"
        >
          <Search className="text-gray-500 w-5 h-5" />
          <Input
            placeholder="Search by book title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-none focus-visible:ring-0 text-lg bg-transparent"
          />
          <Button type="submit" disabled={!query} className="rounded-full px-6">
            {loading ? <Spinner className="w-4" /> : "Search"}
          </Button>
        </form>
      </div>
      <div className="mt-16 min-h-[300px]">
        {loading && (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        )}
        {!loading && !products?.data && query.length < 1 && (
          <div className="flex flex-col items-center py-24 text-center opacity-70">
            <Search className="w-16 h-16 mb-4 text-gray-400" />
            <p className="text-lg text-gray-600">
              Start searching for books... 📚
            </p>
          </div>
        )}
        {!loading && products?.data.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-2xl font-semibold text-gray-700">
              No results found 😢
            </p>
            <p className="text-gray-500 mt-2">
              Try searching with a different keyword.
            </p>
          </div>
        )}
        {!loading && products?.data && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.data.map((book) => (
              <BookCardProduct_v2
                key={book.product_id}
                title={book.title}
                authors={book.authors}
                coverImageId={book.cover}
                price={book.price}
                product_id={book.product_id}
                first_publish_year={book.first_publish_year}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchBookPage;
