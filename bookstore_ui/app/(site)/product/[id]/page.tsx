"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/context/UserContext";
import { allBookData } from "@/data/book_data/all_book_data";
import { AddProductToCart } from "@/service/CartService";
import { getProductInformationByProductId } from "@/service/ProductService";
import { ProductInformationResponseType } from "@/type/ResponseType/ProductInformationType";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [productInformation, setproductInformation] =
    React.useState<ProductInformationResponseType>();

  React.useEffect(() => {
    document.title = `${
      allBookData.find((book) => book.work_id === id)?.title
    } - BookStore`;

    const fetchDataProductInformation = async () => {
      setLoading(true);
      try {
        const response = await getProductInformationByProductId(id);
        setproductInformation(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Product Information:", error);
      }
    };

    fetchDataProductInformation();
  }, [id]);

  const router = useRouter();

  //get user from usercontext
  const user = useUser();

  const handleAddToCart = async (product_id: string) => {
    const response = await AddProductToCart(product_id);
    console.log("Add to Cart Response:", response);
  };

  return (
    // Product Data Available
    <div className="flex flex-col gap-2">
      {!loading && productInformation && (
        <div key={productInformation.data.product_id}>
          <div className="lg:flex flex-row gap-10 py-10 lg:px-40 px-10 items-start">
            <img
              src={`https://covers.openlibrary.org/b/id/${productInformation.data.cover}-L.jpg`}
              alt="Image"
              className="lg:w-[400px] lg:h-[500px] h-[400px] w-[300px] object-cover rounded-md"
            />
            <div className="flex flex-col gap-5 max-lg:pt-5 w-full">
              <div className="flex flex-col gap-2 border-b border-slate-400 pb-5">
                <small>
                  Published by{" "}
                  {productInformation.data.productInformation.publishers.join(
                    ", "
                  ) || "Unknown Publisher"}{" "}
                  |{" "}
                  {productInformation.data.productInformation.publish_date ||
                    "Unknown Date"}
                </small>
                <h3 className="text-3xl">{productInformation.data.title}</h3>
                <small>
                  By{" "}
                  {productInformation.data.authors
                    .map((author) => author.name)
                    .join(", ") || "Unknown Author"}{" "}
                </small>
                <div className="flex flex-row flex-wrap items-center gap-2">
                  <img
                    src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66b213487fa1b0077959ba4a_Frame%20309.png"
                    alt="star"
                    className="w-20 h-4"
                  />
                  <p>
                    (
                    {productInformation.data.productSummary.average
                      ? productInformation.data.productSummary.average.toFixed(
                          1
                        )
                      : 0}
                    ) |
                  </p>
                  <p>
                    Want to Read:{" "}
                    {productInformation.data.productCount.want_to_read || 0} |
                    Currently Reading:{" "}
                    {productInformation.data.productCount.currently_reading ||
                      0}{" "}
                    | Already Read:{" "}
                    {productInformation.data.productCount.already_read || 0}
                  </p>
                </div>
                <h3 className="text-2xl mt-2 text-green-700 font-semibold">
                  {productInformation.data.price
                    ? `$${productInformation.data.price}.00 USD`
                    : "Price not available"}
                </h3>
              </div>
              <div className="flex flex-col gap-5">
                {productInformation.data.productInformation.description ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        productInformation.data.productInformation.description,
                    }}
                  ></p>
                ) : (
                  <p className="italic text-slate-500">
                    No description available.
                  </p>
                )}
                <small className="border-t border-slate-400 pt-5 text-slate-700">
                  Quantity available:{" "}
                  {productInformation.data.quantity_in_stock || 0}
                </small>
                <div className="flex flex-row items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={20}
                    defaultValue={1}
                    className="border p-2 rounded-md text-center"
                  />
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer"
                    variant="outline"
                    onClick={
                      user.user
                        ? () =>
                            handleAddToCart(productInformation.data.product_id)
                        : () => router.push("/login")
                    }
                  >
                    Add to Cart
                  </Button>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3 border p-4 rounded-2xl">
                    {productInformation.data.productInformation.isbn_13 &&
                    productInformation.data.productInformation.isbn_13.length >
                      0 ? (
                      <small>
                        ISBN:{" "}
                        <span>
                          {
                            productInformation.data.productInformation
                              .isbn_13[0]
                          }
                        </span>
                      </small>
                    ) : (
                      <small className="italic text-slate-500">
                        No ISBN available.
                      </small>
                    )}
                    {productInformation.data.productInformation.subjects &&
                      productInformation.data.productInformation.subjects
                        .length > 0 && (
                        <small>
                          Subjects:{" "}
                          <span>
                            {productInformation.data.productInformation.subjects.join(
                              ", "
                            )}
                          </span>
                        </small>
                      )}
                    {productInformation.data.productInformation
                      .number_of_pages && (
                      <small>
                        Number of Pages:{" "}
                        {
                          productInformation.data.productInformation
                            .number_of_pages
                        }
                      </small>
                    )}
                  </div>
                  <div className="lg:flex flex-row items-center gap-4">
                    <p>Share :</p>
                    <div className="flex space-x-2 max-lg:space-y-2">
                      <div className="p-2 bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer rounded-md">
                        <Facebook />
                      </div>
                      <div className="p-2 bg-white text-blue-600 cursor-pointer">
                        <Twitter />
                      </div>
                      <div className="p-2 text-black cursor-pointer">
                        <Linkedin />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-t border-slate-400 pt-5">
                <p>Payment Method: </p>
                <div className="flex flex-row items-center gap-2">
                  <img
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
                    alt="momo"
                    className="w-10 h-10"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/VietQR_Logo.svg/3000px-VietQR_Logo.svg.png"
                    alt="vietqr"
                    className="w-25 h-8"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:px-40 px-10">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="lg:text-2xl text-xl">
                  Product Information
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  {productInformation.data.productInformation.description ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          productInformation.data.productInformation
                            .description,
                      }}
                    />
                  ) : (
                    <p>No description available.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="lg:text-2xl text-xl">
                  Shipping Details
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    We offer worldwide shipping through trusted courier
                    partners. Standard delivery takes 3-5 business days, while
                    express shipping ensures delivery within 1-2 business days.
                  </p>
                  <p>
                    All orders are carefully packaged and fully insured. Track
                    your shipment in real-time through our dedicated tracking
                    portal.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="lg:text-2xl text-xl">
                  Return Policy
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    We stand behind our products with a comprehensive 30-day
                    return policy. If you&apos;re not completely satisfied,
                    simply return the item in its original condition.
                  </p>
                  <p>
                    Our hassle-free return process includes free return shipping
                    and full refunds processed within 48 hours of receiving the
                    returned item.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center w-full h-screen">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default page;
