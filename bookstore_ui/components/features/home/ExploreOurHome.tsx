import React from "react";
import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";
import BookCardProduct_v2 from "../../card/BookCardProduct_v2";
import { getProductsByCategory } from "@/service/ProductService";
import { ProductType } from "@/type/ResponseType/ProductType";
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
      } catch (error) {
        console.error("Error fetching Kids Products:", error);
      }
      setLoading(false);
    };
    fetchDataProductKid();
  }, []);

  return (
    <>
      {productsKid?.data && (
        <section className="relative py-20 px-6 md:px-14 lg:px-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div className="w-96 h-96 bg-purple-400 blur-[150px] rounded-full absolute top-10 left-10"></div>
            <div className="w-96 h-96 bg-blue-400 blur-[150px] rounded-full absolute bottom-10 right-10"></div>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
              <div>
                <p className="text-blue-700 font-medium tracking-widest uppercase">
                  Featured Collection
                </p>
                <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
                  Kids' Books Wonderland
                </h2>
              </div>

              <Button
                size="lg"
                className="backdrop-blur-md px-6 py-5 
                bg-white/40 hover:bg-white border border-white/50 
                text-gray-900 font-semibold shadow-md transition-all rounded-xl flex items-center gap-2"
              >
                Explore All
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {!loading &&
                productsKid.data.slice(0, 6).map((book) => (
                  <div
                    key={book.product_id}
                    className="transition-transform hover:scale-[1.02] hover:-translate-y-1 duration-200"
                  >
                    <BookCardProduct_v2
                      coverImageId={book.cover}
                      title={book.title}
                      authors={book.authors}
                      price={book.price}
                      first_publish_year={book.first_publish_year}
                      product_id={book.product_id}
                    />
                  </div>
                ))}
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center py-32">
                <Spinner className="w-12 h-12 text-blue-700" />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ExploreOurHome;
