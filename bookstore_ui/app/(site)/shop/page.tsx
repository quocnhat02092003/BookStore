import BookCardProduct from "@/components/card/BookCardProduct";

const page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-10 place-items-center max-lg:py-10">
      <BookCardProduct />
      <BookCardProduct />
      <BookCardProduct />
      <BookCardProduct />
      <BookCardProduct />
      <BookCardProduct />
    </div>
  );
};

export default page;
