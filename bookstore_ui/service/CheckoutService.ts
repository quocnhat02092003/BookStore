import { CheckoutType } from "@/type/ResponseType/CheckoutType";
import { API } from "./RefreshTokenService";
import { ShippingType } from "@/type/RequestType/ShippingType";
import { BillingType } from "@/type/RequestType/BillingType";

export const CreateCheckoutSession = async () => {
    const response = await API.post<CheckoutType>(`/api/checkoutstripe/create-checkout-session`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch order information");
    }
    return response.data;
};

export const SaveShippingAddressCheckout = async (shippingAddress: ShippingType) => {
    const response = await API.post(`/api/checkoutstripe/save-address-shipping-checkout`, shippingAddress);
    if (response.status !== 200) {
        throw new Error("Failed to save shipping address");
    }
    return response.data;
};

export const SaveBillingAddressCheckout = async (billingAddress: BillingType) => {
    const response = await API.post(`/api/checkoutstripe/save-address-billing-checkout`, billingAddress);
    if (response.status !== 200) {
        throw new Error("Failed to save shipping address");
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