import { OrderType } from "@/type/ResponseType/OrderType";
import { API } from "./RefreshTokenService";

export const CreateOrder = async () => {
    const response = await API.post(`/api/order/create-orders`);
    if (response.status !== 200) {
        throw new Error("Failed to create order");
    }
    return response.data;
};

export const GetAllOrders = async () => {
    const response = await API.get<OrderType>(`/api/order/all-orders`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch order information");
    }
    return response.data;
};
