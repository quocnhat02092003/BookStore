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
import { allBookCollection } from "@/data/book_collection/all_book_collection";

const page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-10 place-items-center max-lg:py-10">
        {allBookCollection.map((book) => (
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

export default page;
