import { CheckoutType } from "@/type/ResponseType/CheckoutType";
import { API } from "./RefreshTokenService";

export const CreateCheckoutSession = async () => {
    const response = await API.post<CheckoutType>(`/api/checkoutstripe/create-checkout-session`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch order information");
    }
    return response.data;
};

export const CancelCheckout = async () => {
    const response = await API.post(`/api/checkoutstripe/cancel-checkout`);
    if (response.status !== 200) {
        throw new Error("Failed to cancel checkout session");
    }
    return response.data;
}