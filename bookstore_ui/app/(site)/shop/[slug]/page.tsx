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

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
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
            {allBookCollection
              .filter((book) =>
                book.type
                  .map((type) => type.toLowerCase())
                  .includes(slug.toLowerCase())
              )
              .map((book) => (
                <BookCardProduct
                  key={book.work_id}
                  authors={book.author_name}
                  coverImageId={book.cover}
                  price={book.price}
                  title={book.title}
                  work_id={book.work_id}
                  first_publish_year={book.first_publish_year}
                />
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-20">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
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
