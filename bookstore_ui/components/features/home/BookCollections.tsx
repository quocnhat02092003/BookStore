"use client";
import React from "react";
import BookCardProduct from "../../card/BookCardProduct";
import { Button } from "../../ui/button";
import { AnimatePresence, motion } from "motion/react";
import { ProductType } from "@/type/ResponseType/ProductType";
import { getProductsByCategory } from "@/service/ProductService";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const BookCollections = () => {
  const [activeTab, setActiveTab] = React.useState<string>("new-arrival");

  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [productsCollection, setProductsCollection] =
    React.useState<ProductType>();

  React.useEffect(() => {
    const fetchDataProductCollection = async () => {
      setLoading(true);
      try {
        const response = await getProductsByCategory(activeTab);
        setProductsCollection(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Book Collection Products:", error);
      }
    };
    fetchDataProductCollection();
  }, [activeTab]);

  return (
    <div className="text-center w-full mb-20 mt-20">
      <h1 className="text-6xl max-lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-sky-400 to-black">
        BOOK COLLECTIONS
      </h1>
      <h3 className="text-xl max-lg:text-base mt-4 px-4">
        Explore our handpicked selections ranging from timeless literature to{" "}
        <br />
        contemporary bestsellers across diverse genres.
      </h3>
      <div className="flex flex-wrap gap-2 justify-center mt-5">
        <Button
          className={`${
            activeTab === "new-arrival" && "bg-blue-500 text-white"
          }`}
          onClick={() => setActiveTab("new-arrival")}
        >
          New Arrival
        </Button>
        <Button
          className={`${
            activeTab === "best-seller" && "bg-blue-500 text-white"
          }`}
          onClick={() => setActiveTab("best-seller")}
        >
          Best Seller
        </Button>
        <Button
          className={`${activeTab === "featured" && "bg-blue-500 text-white"}`}
          onClick={() => setActiveTab("featured")}
        >
          Featured
        </Button>
      </div>
      <div className="xl:px-50 lg:px-20 md:px-20 sm:px-20 px-10 mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10"
          >
            {/* Product available */}
            {!loading &&
              productsCollection?.data &&
              productsCollection.data
                .slice(0, 8)
                .map((book) => (
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
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center w-full h-48 col-span-4">
                <Spinner />
              </div>
            )}
            {/* No Product available */}
            {!loading &&
              productsCollection?.data &&
              productsCollection.data.length == 0 && (
                <p className="col-span-4 h-96 justify-center items-center flex text-gray-500">
                  No books available in this collection.
                </p>
              )}
          </motion.div>
        </AnimatePresence>
      </div>
      <Button onClick={() => router.push("/shop")} size="lg" className="mt-10">
        Explore All
      </Button>
    </div>
  );
};

export default BookCollections;
