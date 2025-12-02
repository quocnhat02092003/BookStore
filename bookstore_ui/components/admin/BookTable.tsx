"use client";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { ProductType } from "@/type/ResponseType/ProductType";
import { getAllProduct_Admin } from "@/service/AdminService";
import { Spinner } from "../ui/spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";

export function BooksTable() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [productsShop, setProductsShop] = React.useState<ProductType>();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedBook, setSelectedBook] = React.useState<string | null>(null);

  React.useEffect(() => {
    document.title = "Books Dashboard - BookStore Management";
    const fetchDataProductShop = async () => {
      setLoading(true);
      try {
        const response = await getAllProduct_Admin();
        setProductsShop(response);
        localStorage.setItem(
          "productsLength",
          JSON.stringify(response.data.length)
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Deal of Week Products:", error);
      }
    };
    fetchDataProductShop();
  }, []);
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Cover</TableHead>
            <TableHead className="w-[150px]">Book ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Available Data */}
          {!loading &&
            productsShop?.data &&
            productsShop?.data.map((book) => (
              <TableRow key={book.product_id}>
                <TableCell>
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`}
                    alt={book.title}
                    width={50}
                    height={70}
                    className="rounded-md object-cover border"
                  />
                </TableCell>

                <TableCell className="font-medium">{book.product_id}</TableCell>

                <TableCell className="font-semibold">{book.title}</TableCell>

                <TableCell>
                  {book.authors
                    .slice(0, 3)
                    .map((author) => author.name)
                    .join(", ")}
                  {book.authors.length > 3 && "..."}
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">{book.category}</Badge>
                </TableCell>

                <TableCell>{book.price.toLocaleString()}$</TableCell>

                <TableCell>
                  {book.quantity_in_stock > 10 ? (
                    <span className="text-green-600 font-medium">
                      {book.quantity_in_stock}
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      {book.quantity_in_stock}
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={() => {
                          setSelectedBook(book.product_id);
                          setOpenDialog(!openDialog);
                        }}
                      >
                        <Pencil size={16} /> Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-500 flex items-center gap-2"
                        onClick={() =>
                          toast.warning("Delete this book, sure?", {
                            action: {
                              label: "Yes, Delete",
                              onClick: () => {
                                toast.success("Book deleted successfully.");
                              },
                            },
                          })
                        }
                      >
                        <Trash size={16} /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* No data Available */}
      {!loading && productsShop?.data.length === 0 && (
        <div className="flex justify-center items-center w-full h-48">
          No books available.
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center w-full h-48">
          <Spinner />
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {selectedBook &&
          productsShop?.data.find((b) => b.product_id === selectedBook) && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
                <DialogDescription>
                  User information and actions.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-3">
                  <Label htmlFor="id">Book ID</Label>
                  <Input id="id" defaultValue={selectedBook} readOnly />
                  <Label htmlFor="Title">Title</Label>
                  <Input
                    id="Title"
                    readOnly
                    defaultValue={
                      productsShop.data.find(
                        (b) => b.product_id === selectedBook
                      )?.title
                    }
                  />
                  <Label htmlFor="Author">Author</Label>
                  <Input
                    id="Author"
                    readOnly
                    defaultValue={productsShop.data
                      .find((b) => b.product_id === selectedBook)
                      ?.authors.map((author) => author.name)
                      .join(", ")}
                  />
                  <Label htmlFor="Category">Category</Label>
                  <Input
                    id="Category"
                    readOnly
                    defaultValue={
                      productsShop.data.find(
                        (b) => b.product_id === selectedBook
                      )?.category
                    }
                  />
                  <Label htmlFor="Price">Price</Label>
                  <Input
                    id="Price"
                    readOnly
                    defaultValue={
                      productsShop.data
                        .find((b) => b.product_id === selectedBook)
                        ?.price.toLocaleString() + "$"
                    }
                  />
                  <Label htmlFor="Stock">Stock</Label>
                  <Input
                    id="Stock"
                    readOnly
                    defaultValue={
                      productsShop.data.find(
                        (b) => b.product_id === selectedBook
                      )?.quantity_in_stock
                    }
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          )}
      </Dialog>
    </div>
  );
}
