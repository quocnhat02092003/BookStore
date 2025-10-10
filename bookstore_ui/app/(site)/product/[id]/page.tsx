"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { allBookData } from "@/data/book_data/all_book_data";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col gap-2">
      {allBookData
        .filter((book) => book.work_id === id)
        .slice(0, 1)
        .map((book) => (
          <div key={book.work_id}>
            <div className="lg:flex flex-row gap-10 py-10 lg:px-40 px-10 items-start">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                alt="Image"
                className="lg:w-[400px] lg:h-[500px] h-[400px] w-[300px] object-cover rounded-md"
              />
              <div className="flex flex-col gap-5 max-lg:pt-5 w-full">
                <div className="flex flex-col gap-2 border-b border-slate-400 pb-5">
                  <small>
                    Published by{" "}
                    {book.publishers.join(", ") || "Unknown Publisher"} |{" "}
                    {book.publish_date || "Unknown Date"}
                  </small>
                  <h3 className="text-3xl">{book.title}</h3>
                  <small>
                    By{" "}
                    {book.authors.map((author) => author.name).join(", ") ||
                      "Unknown Author"}{" "}
                  </small>
                  <div className="flex flex-row flex-wrap items-center gap-2">
                    <img
                      src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66b213487fa1b0077959ba4a_Frame%20309.png"
                      alt="star"
                      className="w-20 h-4"
                    />
                    <p>
                      (
                      {book.summary.average
                        ? book.summary.average.toFixed(1)
                        : 0}
                      ) |
                    </p>
                    <p>
                      Want to Read: {book.counts.want_to_read || 0} | Currently
                      Reading: {book.counts.currently_reading || 0} | Already
                      Read: {book.counts.already_read || 0}
                    </p>
                  </div>
                  <p>
                    {book.price
                      ? `$${book.price}.00 USD`
                      : "Price not available"}
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  {book.description ? (
                    <p>{book.description}</p>
                  ) : (
                    <p className="italic text-slate-500">
                      No description available.
                    </p>
                  )}
                  <div className="flex flex-row items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={999}
                      defaultValue={1}
                      className="border p-2 rounded-md text-center"
                    />
                    <Button
                      className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer"
                      variant="outline"
                    >
                      Add to Cart
                    </Button>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 border p-4 rounded-2xl">
                      {book.isbn_13 && book.isbn_13.length > 0 ? (
                        <small>
                          ISBN: <span>{book.isbn_13[0]}</span>
                        </small>
                      ) : (
                        <small className="italic text-slate-500">
                          No ISBN available.
                        </small>
                      )}
                      {book.subjects && book.subjects.length > 0 && (
                        <small>
                          Subjects: <span>{book.subjects.join(", ")}</span>
                        </small>
                      )}
                      {book.number_of_pages && (
                        <small>Number of Pages: {book.number_of_pages}</small>
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
                    {book.description ? (
                      <p>{book.description}</p>
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
                      express shipping ensures delivery within 1-2 business
                      days.
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
                      Our hassle-free return process includes free return
                      shipping and full refunds processed within 48 hours of
                      receiving the returned item.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))}
    </div>
  );
};

export default page;
