import { CartType } from "@/type/ResponseType/CartType";
import { API } from "./RefreshTokenService";

export const GetAllCart = async () => {
    const response = await API.get<CartType>(`/api/cart/all-cart`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch cart information");
    }
    return response.data;
};

export const AddProductToCart = async (productId: string) => {
    const response = await API.post(`/api/cart/add-to-cart?product_id=${productId}`);
    if (response.status !== 200) {
        throw new Error("Failed to add product to cart");
    }
    return response.data;
};

export const ChangeCartItemQuantity = async (productId: string, quantity: number) => {
    const response = await API.put(
        `/api/cart/change-quantity?product_id=${productId}&quantity=${quantity}`
    );
    if (response.status !== 200) {
        throw new Error("Failed to change cart item quantity");
    }
    return response.data;
};

export const RemoveCartItem = async (productId: string) => {
    const response = await API.delete(`/api/cart/remove-item?product_id=${productId}`);
    if (response.status !== 200) {
        throw new Error("Failed to remove cart item");
    }
    return response.data;
};