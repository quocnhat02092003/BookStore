"use client";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { GetAllOrders } from "@/service/OrderService";
import { OrderType } from "@/type/ResponseType/OrderType";
import React from "react";

const ProductCardOrderV2 = () => {
  const [orderItems, setOrderItems] = React.useState<OrderType | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.title = "Checkout - BookStoreX";
    setLoading(true);
    const fetchDataAllOrders = async () => {
      try {
        const response = await GetAllOrders();
        console.log("All Orders:", response);
        setOrderItems(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAllOrders();
  }, []);

  return (
    <>
      {!loading &&
        orderItems?.data &&
        orderItems?.data.map((orderItem) => (
          <div
            key={orderItem.order_id}
            className="flex flex-col gap-6 max-xl:mt-4 md:p-10 p-5 bg-slate-100 rounded-lg"
          >
            <h3 className="md:text-3xl text-2xl">YOUR ORDER</h3>
            <div className="flex flex-col gap-4 border p-4 rounded-2xl">
              {orderItem.orderItems.map((item) => (
                <div
                  key={item.product.product_id}
                  className="md:flex flex-row items-center gap-32 rounded-lg max-md:space-y-4"
                >
                  <div className="md:flex flex-row items-center gap-4 max-md:space-y-4">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${item.product.cover}-L.jpg`}
                      alt=""
                      className="w-30 h-40 object-cover rounded-lg"
                    />
                    <div className="w-[200px] ">
                      <p className="font-bold truncate">
                        {item.product.title}{" "}
                      </p>
                      <small>Items : {item.quantity}</small>
                    </div>
                  </div>
                  <div>
                    <h6>Total</h6>
                    <p>${item.price}.00</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col border-b pb-4">
              <p>Vourcher</p>
              <div className="flex flex-row items-center gap-4 mt-2">
                <Input type="text" />
                <button className="bg-green-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-800 duration-300">
                  Apply
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between border-b pb-4">
              <p>Subtotal</p>
              <h6 className="text-lg font-bold">${orderItem.total_price}.00</h6>
            </div>
            <div className="flex flex-row items-center justify-between border-b pb-4">
              <h3 className="text-2xl">Total</h3>
              <h6 className="text-lg font-bold">${orderItem.total_price}.00</h6>
            </div>
          </div>
        ))}

      {/* OrderItem not found state */}
      {!loading && (!orderItems?.data || orderItems.data.length === 0) ? (
        <div className="flex flex-col items-center justify-center h-60">
          <h3 className="text-2xl font-bold mb-4">No Orders Found</h3>
          <p className="text-gray-600">You have not placed any orders yet.</p>
        </div>
      ) : null}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center w-full h-48">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default ProductCardOrderV2;
