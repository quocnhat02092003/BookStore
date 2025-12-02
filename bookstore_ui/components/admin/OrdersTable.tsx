"use client";

import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React from "react";
import { OrderType } from "@/type/ResponseType/OrderType";
import { getAllOrder_Admin } from "@/service/AdminService";
import { Spinner } from "../ui/spinner";
import dayjs from "dayjs";
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

export function OrdersTable() {
  const renderStatus = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "Shipped":
        return <Badge className="bg-blue-500">Shipped</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const [loading, setLoading] = React.useState<boolean>(false);
  const [ordersData, setOrdersData] = React.useState<OrderType>();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openStatusDialog, setOpenStatusDialog] =
    React.useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = React.useState<string>("");

  React.useEffect(() => {
    document.title = "Orders Dashboard - BookStore Management";
    const fetchDataOrders = async () => {
      setLoading(true);
      try {
        const response = await getAllOrder_Admin();
        console.log("Orders fetched:", response);
        localStorage.setItem(
          "ordersDataLength",
          JSON.stringify(response.data.length)
        );
        setOrdersData(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Deal of Week Products:", error);
      }
    };
    fetchDataOrders();
  }, []);

  return (
    <div className="border rounded-md">
      {!loading && ordersData?.data !== undefined ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!loading &&
              ordersData?.data.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell className="font-medium">
                    {order.order_id}
                  </TableCell>
                  <TableCell>{order.user?.fullName}</TableCell>
                  <TableCell>{order.total_price.toLocaleString()}$</TableCell>
                  <TableCell>{renderStatus(order.status)}</TableCell>
                  <TableCell>
                    {dayjs(order.created_at).format("HH:mm:ss DD/MM/YYYY")}
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
                        <div className="text-sm w-[200px]">
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
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setOpenDialog(true);
                            setSelectedOrder(order.order_id);
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setOpenStatusDialog(true);
                            setSelectedOrder(order.order_id);
                          }}
                        >
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            toast.warning("Cancel this order, sure?", {
                              action: {
                                label: "Yes, Cancel",
                                onClick: () => {
                                  toast.success(
                                    "Order cancelled successfully."
                                  );
                                },
                              },
                            })
                          }
                          className="text-red-500"
                        >
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : null}
      {/* No data Available */}
      {!loading && ordersData?.data.length === 0 && (
        <div className="flex justify-center items-center w-full h-48">
          No orders available.
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
        {selectedOrder &&
          ordersData?.data.find((o) => o.order_id === selectedOrder) && (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                  Order information and actions.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-3">
                  <Label htmlFor="link">Order ID</Label>
                  <Input id="link" defaultValue={selectedOrder} readOnly />
                  <Label htmlFor="CustomerID">Customer ID</Label>
                  <Input
                    id="CustomerID"
                    defaultValue={
                      ordersData?.data.find((o) => o.order_id === selectedOrder)
                        ?.user?.id || ""
                    }
                    readOnly
                  />
                  <Label htmlFor="CustomerName">Customer Name</Label>
                  <Input
                    id="CustomerName"
                    defaultValue={
                      ordersData?.data.find((o) => o.order_id === selectedOrder)
                        ?.user?.fullName || ""
                    }
                    readOnly
                  />
                  <Label htmlFor="CustomerEmail">Customer Email</Label>
                  <Input
                    id="CustomerEmail"
                    defaultValue={
                      ordersData?.data.find((o) => o.order_id === selectedOrder)
                        ?.user?.email || ""
                    }
                    readOnly
                  />
                  <Label htmlFor="totalPrice">Total Price</Label>
                  <Input
                    id="totalPrice"
                    defaultValue={
                      ordersData?.data
                        .find((o) => o.order_id === selectedOrder)
                        ?.total_price.toLocaleString() + "$" || ""
                    }
                    readOnly
                  />
                  <Label htmlFor="orderStatus">Order Status</Label>
                  <Input
                    id="orderStatus"
                    defaultValue={
                      ordersData?.data.find((o) => o.order_id === selectedOrder)
                        ?.status || ""
                    }
                    readOnly
                  />
                  <Label htmlFor="orderDate">Order Date</Label>
                  <Input
                    id="orderDate"
                    defaultValue={
                      dayjs(
                        ordersData?.data.find(
                          (o) => o.order_id === selectedOrder
                        )?.created_at
                      ).format("YYYY-MM-DD HH:mm:ss") || ""
                    }
                    readOnly
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

      {/* Update Order Status Dialog */}
      <Dialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Status Update</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="link">Order ID</Label>
            <Input id="link" defaultValue={selectedOrder} readOnly />
            <Label htmlFor="CustomerID">Customer ID</Label>
            <Input
              id="CustomerID"
              defaultValue={
                ordersData?.data.find((o) => o.order_id === selectedOrder)?.user
                  ?.id || ""
              }
              readOnly
            />
            <Label htmlFor="CustomerName">Customer Name</Label>
            <Input
              id="CustomerName"
              defaultValue={
                ordersData?.data.find((o) => o.order_id === selectedOrder)?.user
                  ?.fullName || ""
              }
              readOnly
            />
            <Label htmlFor="orderStatus">Order Status</Label>
            <select
              id="orderStatus"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Shipping">Shipping</option>
              <option value="Shipped">Shipped</option>
            </select>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="button" variant="default">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
