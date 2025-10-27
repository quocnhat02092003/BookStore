"use client";
import React from "react";
import BookCardProduct from "../../card/BookCardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { getProductsByCategory } from "@/service/ProductService";
import { ProductType } from "@/type/ResponseType/ProductType";
import { Spinner } from "@/components/ui/spinner";

const DealOfWeek = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [productsDealOfWeek, setProductsDealOfWeek] =
    React.useState<ProductType>();

  React.useEffect(() => {
    const fetchDataProductDealOfWeek = async () => {
      setLoading(true);
      try {
        const response = await getProductsByCategory("deal_of_week");
        setProductsDealOfWeek(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Deal of Week Products:", error);
      }
    };
    fetchDataProductDealOfWeek();
  }, []);

  return (
    <>
      {productsDealOfWeek?.data && (
        <div className="text-center w-full mb-20">
          <h1 className="text-6xl max-lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-sky-400 to-black">
            DEALS OF THE WEEK
          </h1>
          <h3 className="text-xl mt-4">
            Get the best deals on your favorite books!
          </h3>
          <div className="max-xl:mx-4 xl:mx-24 mt-14">
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                1600: { slidesPerView: 4 },
                1280: { slidesPerView: 3 },
                600: { slidesPerView: 2 },
                300: { slidesPerView: 1 },
              }}
              loop={true}
              autoplay={{ delay: 3000 }}
              className="w-full mx-auto max-xl:max-w-3xl py-8 px-6 rounded-3xl my-6"
            >
              {/* Product available */}
              {!loading &&
                productsDealOfWeek.data.map((product) => (
                  <SwiperSlide key={product.product_id} className="gap-4 p-8">
                    <BookCardProduct
                      product_id={product.product_id}
                      authors={product.authors}
                      title={product.title}
                      price={product.price}
                      coverImageId={product.cover}
                      first_publish_year={product.first_publish_year}
                    />
                  </SwiperSlide>
                ))}
              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center w-full h-48">
                  <Spinner />
                </div>
              )}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default DealOfWeek;
