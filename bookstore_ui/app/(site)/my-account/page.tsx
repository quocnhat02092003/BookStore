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
import { GetAllOrderPaid } from "@/service/OrderService";
import { OrderType } from "@/type/ResponseType/OrderType";
import React from "react";

const MyAccountPage = () => {
  const [tab, setTab] = React.useState<string>("dashboard");
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [orderItems, setOrderItems] = React.useState<OrderType>();
  const { user } = useUser();

  const fetchOrderPaid = async () => {
    try {
      const response = await GetAllOrderPaid();
      setOrderItems(response);
    } catch (error) {
      console.error("Error fetching paid orders:", error);
    }
  };

  React.useEffect(() => {
    document.title = "My Account - BookStore";
    if (tab === "orders") fetchOrderPaid();
  }, [tab]);

  const sidebarItem = (value: string, label: string) => (
    <Button
      onClick={() => setTab(value)}
      variant="ghost"
      className={`w-full text-left rounded-lg px-5 py-3 transition-all ${
        tab === value
          ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
          : "hover:bg-gray-100"
      }`}
    >
      {label}
    </Button>
  );

  return (
    <div className="px-6 md:px-20 lg:px-40 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-10 mt-10">
        <div className="flex flex-col gap-3 w-full lg:w-60 border rounded-xl p-5 shadow-sm bg-white">
          {sidebarItem("dashboard", "Dashboard")}
          {sidebarItem("orders", "Orders")}
          {sidebarItem("addresses", "Addresses")}
        </div>
        {tab === "dashboard" && (
          <div className="flex flex-col bg-white rounded-xl p-6 shadow-md max-w-xl w-full">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome, {user?.fullName}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-500 text-sm">Email</label>
                <Input disabled={!isEditing} defaultValue={user?.email} />
              </div>

              <div>
                <label className="text-gray-500 text-sm">Full Name</label>
                <Input disabled={!isEditing} defaultValue={user?.fullName} />
              </div>

              <Button variant="link" className="text-blue-600 px-0">
                Change Password
              </Button>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="w-32"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>

                <Button className="bg-blue-600 text-white hover:bg-blue-700 w-32">
                  Save
                </Button>
              </div>
            </div>

            <p className="mt-5 text-gray-500 text-sm">
              Manage your orders, addresses, password and account details here.
            </p>
          </div>
        )}
        {tab === "orders" && (
          <div className="bg-white rounded-xl p-6 shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-6">Order History</h2>

            <Table>
              <TableCaption className="text-sm text-gray-400">
                You can cancel only confirmed orders.
              </TableCaption>

              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">Product</TableHead>
                  <TableHead className="text-center">Method</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orderItems?.data?.map((order) => (
                  <TableRow key={order.order_id} className="hover:bg-gray-50">
                    <TableCell className="text-center">
                      {order.orderItems.map((i) => i.product_id).join(", ")}
                    </TableCell>

                    <TableCell>
                      {order.orderItems.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex items-center gap-3 py-2"
                        >
                          <img
                            src={`https://covers.openlibrary.org/b/id/${item.product.cover}-L.jpg`}
                            className="w-12 h-16 rounded-md object-cover"
                          />
                          <div className="text-sm">
                            <p className="font-medium truncate">
                              {item.product.title}
                            </p>
                            <span className="text-gray-400">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell className="text-center text-sm">
                      Credit Card
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      ${order.total_price}
                    </TableCell>
                    <TableCell className="text-center capitalize">
                      {order.status}
                    </TableCell>

                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        className="text-red-600 hover:bg-red-500 hover:text-white transition"
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {tab === "addresses" && (
          <div className="p-6 bg-white rounded-xl shadow-md w-full">
            <h2 className="text-xl font-semibold">Addresses</h2>
            <p className="mt-3 text-gray-500">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccountPage;
