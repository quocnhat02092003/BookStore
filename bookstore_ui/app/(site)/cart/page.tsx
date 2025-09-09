"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import React from "react";

const page = () => {
  const [updateQuantity, setUpdateQuantity] = React.useState<number>(1);
  return (
    <div>
      <h1 className="text-4xl font-bold text-center m-20">
        Your Cart (7 items)
      </h1>
      <div className="px-40 max-xl:px-10 max-sm:px-5">
        <Table className="border">
          <TableCaption>A list of your cart items.</TableCaption>
          <TableHeader>
            <TableRow className="bg-green-800 hover:bg-green-900">
              <TableHead className="w-[100px] text-center border-r text-white">
                SKU
              </TableHead>
              <TableHead className="text-center border-r text-white">
                Product
              </TableHead>
              <TableHead className="text-center border-r text-white">
                Price
              </TableHead>
              <TableHead className="text-center border-r text-white">
                Quantity
              </TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 7 }, (_, index) => (
              <TableRow
                key={index}
                className={
                  index % 2 === 0 ? "" : "bg-green-50 hover:bg-green-50"
                }
              >
                <TableCell className="font-medium text-center border-r ">
                  {`INV00${index + 1}`}
                </TableCell>
                <TableCell className="border-r py-5 px-2">
                  <div className="xl:flex items-center gap-5 justify-center max-xl:space-y-2">
                    <img
                      src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/6710dad340a77e5ff46764c3_book%20image-11.png"
                      className="w-30 h-auto rounded-2xl"
                    />
                    <div className="lg:w-[300px] w-[200px]">
                      <h4 className="text-xl truncate">
                        Book Title Book Title Book Title Book Title Book Title
                        Book Title
                      </h4>
                      <p className="truncate text-slate-500">
                        By Pham Quoc Nhat
                      </p>
                      <p className="truncate text-slate-500">
                        Category: Fiction
                      </p>
                      <p className="truncate text-slate-500">
                        Quantity in stock: 20
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center border-r">
                  <p>$ 349.00</p>
                </TableCell>
                <TableCell className="border-r">
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      onClick={() => setUpdateQuantity((prev) => prev - 1)}
                      variant="outline"
                      disabled={updateQuantity <= 1}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      id="quantity"
                      max={999}
                      className="py-2 px-4 border text-center w-16 rounded-md bg-green-900 text-white"
                      value={
                        updateQuantity < 1
                          ? 1
                          : updateQuantity > 999
                          ? 999
                          : updateQuantity
                      }
                      onChange={(e) =>
                        setUpdateQuantity(Number(e.target.value))
                      }
                    />
                    <Button
                      onClick={() => setUpdateQuantity((prev) => prev + 1)}
                      variant="outline"
                      disabled={updateQuantity >= 999}
                    >
                      +
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    onClick={() =>
                      //   Array.from({ length: 7 }, (_, i) => i).splice(index, 1)
                      console.log("Delete", index)
                    }
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-center">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="text-right px-40 py-10 max-xl:px-10 max-sm:px-5">
        <Button className="bg-green-800 hover:bg-green-900 text-white">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default page;
