"use client";
import BookCardProduct from "@/components/card/BookCardProduct";
import { allBookCollection } from "@/data/book_collection/all_book_collection";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductType } from "@/type/ResponseType/ProductType";
import { getProductsByCategory } from "@/service/ProductService";
import { Spinner } from "@/components/ui/spinner";

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const [productsCategory, setProductsCategory] = React.useState<ProductType>();

  React.useEffect(() => {
    const fetchDataProductCategory = async () => {
      setLoading(true);
      try {
        const response = await getProductsByCategory(slug.toLowerCase());
        setProductsCategory(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Category Products:", error);
      }
    };
    fetchDataProductCategory();
  }, [slug]);

  console.log("slug", slug);
  console.log("productsCategory", productsCategory);

  return (
    <div>
      <div className="max-lg:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-10 place-items-center"
          >
            {productsCategory?.data &&
              productsCategory.data.length > 0 &&
              productsCategory.data.map((book) => (
                <BookCardProduct
                  key={book.product_id}
                  authors={book.authors}
                  coverImageId={book.cover}
                  price={book.price}
                  title={book.title}
                  product_id={book.product_id}
                  first_publish_year={book.first_publish_year}
                />
              ))}
          </motion.div>
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center w-full h-48">
              <Spinner />
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-20">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {productsCategory &&
              productsCategory.totalPages &&
              productsCategory.totalPages > 0 &&
              Array.from({ length: productsCategory.totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" isActive={i === 0}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {productsCategory && productsCategory.totalPages > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Page;
