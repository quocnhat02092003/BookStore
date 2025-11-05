import { API } from "./RefreshTokenService";

export const CreateCheckoutSession = async () => {
    const response = await API.post(`/api/checkoutstripe/create-checkout-session`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch order information");
    }
    return response.data;
};