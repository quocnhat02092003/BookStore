"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/context/UserContext";
import React from "react";

const MyAccountPage = () => {
  const [tab, setTab] = React.useState<string>("dashboard");
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const { user } = useUser();

  React.useEffect(() => {
    document.title = "My Account - BookStore";
  }, []);

  return (
    <div className="px-40 max-xl:px-10 max-sm:px-5 py-10">
      <h1 className="text-4xl">MY ACCOUNT</h1>
      <div className="flex flex-row gap-10 mt-10 items-start">
        <div className="flex flex-col gap-5 my-5">
          <Button
            onClick={() => setTab("dashboard")}
            variant="outline"
            className={`${
              tab === "dashboard"
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer"
                : ""
            } pr-20 py-5`}
          >
            Dashboard
          </Button>
          <Button
            onClick={() => setTab("orders")}
            variant="outline"
            className={`${
              tab === "orders"
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer"
                : ""
            } pr-20 py-5`}
          >
            Orders
          </Button>
          <Button
            onClick={() => setTab("addresses")}
            variant="outline"
            className={`${
              tab === "addresses"
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer"
                : ""
            } pr-20 py-5`}
          >
            Addresses
          </Button>
        </div>

        {/* Dashboard Tab */}
        {tab === "dashboard" && (
          <div className="flex flex-col max-w-lg">
            <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
            <label className="text-slate-400">Hello, {user?.fullName}</label>
            <br />
            <div className="flex flex-col space-y-2 mb-5">
              <label htmlFor="">Email:</label>
              <Input
                disabled={!isEditing}
                defaultValue={user?.email}
                type="email"
              />
            </div>
            <div className="flex flex-col space-y-2 mb-5">
              <label htmlFor="">Name:</label>
              <Input
                disabled={!isEditing}
                defaultValue={user?.fullName}
                type="text"
              />
            </div>
            <div className="flex flex-row items-center gap-2 mb-5">
              <label htmlFor="">Password:</label>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer">
                Change Password
              </Button>
            </div>
            <div className="flex flex-row space-x-2 mb-5">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-red-500 text-white hover:bg-red-700 hover:text-white cursor-pointer w-32"
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer w-32">
                Save Changes
              </Button>
            </div>
            <p className="mb-2">
              From your account dashboard you can view your recent orders,
              manage your shipping and billing addresses, and edit your password
              and account details.
            </p>
          </div>
        )}

        {/* Order Tab */}
        {tab === "orders" && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-5">
              Orders - {user?.fullName}
            </h2>
            <Table className="border">
              <TableCaption>
                Orders can only be canceled when they are in order confirmed
                status.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center border-r">
                    SKU
                  </TableHead>
                  <TableHead className="text-center border-r">
                    Product
                  </TableHead>
                  <TableHead className="text-center border-r">Method</TableHead>
                  <TableHead className="text-center border-r ">
                    Amount
                  </TableHead>
                  <TableHead className="text-center border-r">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center border-r">INV001</TableCell>
                  <TableCell className="text-center border-r">
                    <div className="flex xl:flex-row flex-col items-center flex-wrap gap-5 max-xl:space-y-2">
                      <img
                        src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/6710dad340a77e5ff46764c3_book%20image-11.png"
                        className="w-30 h-auto rounded-2xl"
                      />
                      <div className="flex flex-col items-start">
                        <h4 className="text-xl truncate lg:w-[300px] w-[200px]">
                          Book Title Book Title Book Title Book Title Book Title
                          Book Title
                        </h4>
                        <p className=" text-slate-500">By Pham Quoc Nhat</p>
                        <p className=" text-slate-500">Category: Fiction</p>
                        <p className=" text-slate-500">Quantity in stock: 20</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center border-r">
                    Credit Card
                  </TableCell>
                  <TableCell className="text-right border-r">$250.00</TableCell>
                  <TableCell className="text-right border-r">
                    Processing
                  </TableCell>
                  <TableCell className="text-right">
                    <Button className="bg-green-600 text-white hover:bg-green-700 hover:text-white cursor-pointer">
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

        {tab === "addresses" && <div>Addresses Content</div>}
      </div>
    </div>
  );
};

export default MyAccountPage;
