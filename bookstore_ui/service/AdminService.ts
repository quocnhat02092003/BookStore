import { ProductType } from "@/type/ResponseType/ProductType";
import { API } from "./RefreshTokenService";
import { UserType } from "@/type/ResponseType/UserType";
import { OrderType } from "@/type/ResponseType/OrderType";
import { ChartDataAdminType } from "@/type/ResponseType/ChartDataAdminType";

export const getAllProduct_Admin = async ()  => {
    const response = await API.get<ProductType>(`/api/admin/all-products-no-pagination`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const getAllUser_Admin = async ()  => {
    const response = await API.get<UserType>(`/api/admin/all-users-no-pagination`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const getAllOrder_Admin = async ()  => {
    const response = await API.get<OrderType>(`/api/admin/all-orders-no-pagination`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const getOrderStatusCount_Admin = async ()  => {
    const response = await API.get<ChartDataAdminType>(`/api/admin/orders-status-chart`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const getRevenueByMonths_Admin = async ()  => {
    const response = await API.get<ChartDataAdminType>(`/api/admin/revenue-by-months-chart`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const getUserByMonths_Admin = async ()  => {
    const response = await API.get<ChartDataAdminType>(`/api/admin/user-by-months-chart`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}