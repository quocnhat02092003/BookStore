"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
import {
  ChangeCartItemQuantity,
  GetAllCart,
  RemoveCartItem,
} from "@/service/CartService";
import { CartType } from "@/type/ResponseType/CartType";
import { Trash } from "lucide-react";
import React from "react";
import { enqueueSnackbar } from "notistack";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { CreateOrder } from "@/service/OrderService";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

const CartPage = () => {
  // Router instance
  const Router = useRouter();

  // Loading state
  const [loading, setLoading] = React.useState<boolean>(false);

  // Cart items state
  const [cartItems, setCartItems] = React.useState<CartType>();

  //User from useContext
  const user = useUser();

  // Fetch all cart items on component mount
  React.useEffect(() => {
    document.title = "Your Cart - BookStoreX";
    const fetchDataAllCart = async () => {
      setLoading(true);
      try {
        const response = await GetAllCart();
        setCartItems(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching cart items:", error);
      }
    };
    fetchDataAllCart();
  }, []);

  React.useEffect(() => {
    if (user.user?.role === 0) {
      Router.push("/");
    }
  }, [user.user]);

  // Handle quantity change
  const handleChangeQuantity = async (productId: string, quantity: number) => {
    debouncedUpdate(productId, quantity);
    setCartItems((prevCart) => {
      if (!prevCart) return prevCart;
      const updatedItems = prevCart.data.cartItems.map((item) => {
        if (item.product_id === productId) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      return {
        ...prevCart,
        data: { ...prevCart.data, cartItems: updatedItems },
      };
    });
  };

  // Debounced function to update cart item quantity
  const debouncedUpdate = React.useMemo(
    () =>
      debounce(async (productId: string, quantity: number) => {
        try {
          await ChangeCartItemQuantity(productId, quantity);
        } catch (err) {
          toast.error("Failed to update cart item quantity");
        }
      }, 500),
    []
  );

  // Handle item remove
  const handleRemoveItem = async (productId: string) => {
    try {
      await RemoveCartItem(productId);
      setCartItems((prevCart) => {
        if (!prevCart) return prevCart;
        const updatedItems = prevCart.data.cartItems.filter(
          (item) => item.product_id !== productId
        );
        return {
          ...prevCart,
          data: { ...prevCart.data, cartItems: updatedItems },
        };
      });
      enqueueSnackbar("Item removed from cart", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  //Handle redirect to checkout
  const RedirectToCheckOut = () => {
    toast.success("Going to checkout...", {
      action: {
        label: "OK",
        onClick: async () => {
          try {
            const response = await CreateOrder();
            if (response) {
              enqueueSnackbar(
                "Success, auto redirect to checkout after 3 seconds"
              );
              setTimeout(() => {
                Router.push("/checkout");
              }, 3000);
            }
          } catch (error) {
            enqueueSnackbar("Something went wrong", {
              variant: "error",
              anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
          }
        },
      },
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center m-20">
        Your Cart (
        {(cartItems?.data.cartItems && cartItems?.data.cartItems.length) || 0}{" "}
        items)
      </h1>
      {/* Available Product in your cart */}
      <div className="px-40 max-xl:px-10 max-sm:px-5">
        {!loading &&
          cartItems?.data &&
          cartItems?.data.cartItems.length > 0 && (
            <Table className="border">
              <TableCaption>A list of your cart items.</TableCaption>
              <TableHeader>
                <TableRow className="bg-green-800 hover:bg-green-900">
                  <TableHead className="w-[100px] text-center border-r text-white">
                    ID
                  </TableHead>
                  <TableHead className="text-center border-r text-white">
                    Product
                  </TableHead>
                  <TableHead className="text-center border-r text-white">
                    Quantity
                  </TableHead>
                  <TableHead className="text-center border-r"></TableHead>
                  <TableHead className="text-center text-white border-r">
                    Price
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Total{" "}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading &&
                  cartItems?.data.cartItems.map((item, index) => (
                    <TableRow
                      key={index}
                      className={
                        index % 2 === 0 ? "" : "bg-green-50 hover:bg-green-50"
                      }
                    >
                      <TableCell className="font-medium text-center border-r ">
                        {`${item.product_id}`}
                      </TableCell>
                      <TableCell className="border-r py-5 px-2">
                        <div className="flex max-xl:flex-col items-center gap-5 justify-center max-xl:space-y-2">
                          <img
                            src={`https://covers.openlibrary.org/b/id/${item.product.cover}-L.jpg`}
                            className="w-30 h-auto rounded-2xl"
                          />
                          <div className="lg:w-[300px] w-[200px]">
                            <h4 className="text-xl truncate">
                              {item.product.title}
                            </h4>
                            <p className="truncate text-slate-500">
                              By{" "}
                              {item.product.authors
                                .map((author) => author.name)
                                .join(", ")}
                            </p>
                            <p className="truncate text-slate-500">
                              Category: {item.product.category}
                            </p>
                            <p className="truncate text-slate-500">
                              Quantity in stock:{" "}
                              {item.product.quantity_in_stock}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="border-r">
                        <div className="flex items-center justify-center gap-3">
                          <Button
                            onClick={() => {
                              if (item.quantity > 1) {
                                handleChangeQuantity(
                                  item.product_id,
                                  item.quantity - 1
                                );
                              }
                            }}
                            variant="outline"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <input
                            type="number"
                            id="quantity"
                            min={1}
                            max={999}
                            className="py-2 px-4 border text-center w-16 rounded-md bg-green-900 text-white"
                            value={item.quantity}
                            onChange={(e) => {
                              let value = Number(e.target.value);
                              if (value > 10) value = 10;
                              if (value < 1) value = 1;
                              handleChangeQuantity(item.product_id, value);
                            }}
                          />
                          <Button
                            onClick={() => {
                              if (item.quantity < 10) {
                                handleChangeQuantity(
                                  item.product_id,
                                  item.quantity + 1
                                );
                              }
                            }}
                            variant="outline"
                            disabled={item.quantity >= 10}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center border-r">
                        <Button
                          variant="outline"
                          onClick={() =>
                            toast("Removed item", {
                              description:
                                "The item has been removed from your cart.",
                              action: {
                                label: "Yes",
                                onClick: () =>
                                  handleRemoveItem(item.product_id),
                              },
                            })
                          }
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center border-r">
                        <p>${item.product.price}.00</p>
                      </TableCell>
                      <TableCell className="text-center border-r">
                        <p>${item.product.price * item.quantity}.00</p>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell className="text-center">
                    {cartItems?.data.cartItems.reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )}
                    .00$
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center w-full h-48">
            <Spinner />
          </div>
        )}
        {!loading && cartItems?.data.cartItems.length === 0 && (
          <div className="flex justify-center items-center w-full h-48">
            <p className="text-slate-500">Your cart is empty</p>
          </div>
        )}
      </div>
      {!loading && cartItems?.data && cartItems?.data.cartItems.length > 0 && (
        <div className="text-right px-40 py-10 max-xl:px-10 max-sm:px-5">
          <Button
            onClick={RedirectToCheckOut}
            className="bg-green-800 hover:bg-green-900 text-white"
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
