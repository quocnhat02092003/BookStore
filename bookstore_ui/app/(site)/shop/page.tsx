"use client";
import BookCardProduct from "@/components/card/BookCardProduct";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { getAllProducts } from "@/service/ProductService";
import { ProductType } from "@/type/ResponseType/ProductType";
import React from "react";

const page = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [page, setPage] = React.useState<number>(1);
  const [productsShop, setProductsShop] = React.useState<ProductType>();

  React.useEffect(() => {
    const fetchDataProductShop = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts(page, 12);
        setProductsShop(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Deal of Week Products:", error);
      }
    };
    fetchDataProductShop();
  }, [page]);
  console.log("Products Shop:", productsShop);
  return (
    <>
      {productsShop && productsShop.data.length > 0 && (
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-10 place-items-center max-lg:py-10">
          {!loading &&
            productsShop.data.map((book) => (
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
        </div>
      )}
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center w-full h-48">
          <Spinner />
        </div>
      )}
      {productsShop && productsShop.data.length == 0 && (
        <div className="text-center py-10 h-[50vh]">
          <p className=" font-semibold text-slate-600">No products found</p>
        </div>
      )}
      {productsShop && productsShop.totalPages > 1 && (
        <div className="mt-20">
          <Pagination>
            <PaginationContent>
              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => page > 1 && setPage(page - 1)}
                />
              </PaginationItem>

              {/* Pages */}
              {Array.from({ length: productsShop.totalPages }, (_, index) => {
                const pageIndex = index + 1;

                // Nếu tổng trang > 5 → ẩn bớt & chỉ hiển thị logic cần thiết
                if (productsShop.totalPages > 5) {
                  // Hiển thị: 1, current-1, current, current+1, last page
                  if (
                    pageIndex !== 1 &&
                    pageIndex !== productsShop.totalPages &&
                    Math.abs(pageIndex - page) > 1
                  ) {
                    return null;
                  }
                }

                return (
                  <PaginationItem key={pageIndex}>
                    <PaginationLink
                      onClick={() => setPage(pageIndex)}
                      isActive={pageIndex === page}
                    >
                      {pageIndex}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {/* Ellipsis khi total > 5 */}
              {productsShop.totalPages > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    page < productsShop.totalPages && setPage(page + 1)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default page;
