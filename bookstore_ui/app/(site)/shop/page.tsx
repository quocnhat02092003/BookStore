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
      {productsShop?.totalPages && productsShop.totalPages > 3 && (
        <div className="mt-20">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              {productsShop &&
                productsShop.totalPages &&
                productsShop.totalPages > 0 &&
                Array.from({ length: productsShop.totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setPage(i + 1)}
                      isActive={i + 1 === page}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              {productsShop && productsShop.totalPages > 3 && (
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
      )}
    </>
  );
};

export default page;
