import React from "react";
import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";
import BookCardProduct_v2 from "../../card/BookCardProduct_v2";
import { bookCollectionExploreKidBook } from "@/data/book_collection/book_collection_explore_kid_book";
import { ProductType } from "@/type/ResponseType/ProductType";
import { getProductsByCategory } from "@/service/ProductService";
import { Spinner } from "@/components/ui/spinner";

const ExploreOurHome = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [productsKid, setProductsKid] = React.useState<ProductType>();

  React.useEffect(() => {
    const fetchDataProductKid = async () => {
      setLoading(true);
      try {
        const response = await getProductsByCategory("kid");
        setProductsKid(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Kids Products:", error);
      }
    };
    fetchDataProductKid();
  }, []);
  return (
    <>
      {productsKid?.data && (
        <div className="bg-gradient-to-b from-blue-300 via-slate-100 to-white py-10 w-full">
          <div className="lg:flex flex-row justify-around items-center gap-10 my-20 mx-10 max-lg:space-y-5">
            <h2 className="text-7xl max-lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-sky-400 to-black">
              Explore Our Kids' Books
            </h2>
            <Button size="lg">
              Explore All <ChevronRight />
            </Button>
          </div>
          <div className="grid 2xl:grid-cols-3 md:grid-cols-2 lg:gap-20 max-lg:justify-center max-lg:items-center gap-5 lg:px-20 mb-20">
            {/* Product available */}
            {!loading &&
              productsKid.data
                .slice(0, 6)
                .map((book) => (
                  <BookCardProduct_v2
                    key={book.product_id}
                    coverImageId={book.cover}
                    title={book.title}
                    authors={book.authors}
                    price={book.price}
                    first_publish_year={book.first_publish_year}
                    product_id={book.product_id}
                  />
                ))}
          </div>
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center w-full h-48">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ExploreOurHome;
