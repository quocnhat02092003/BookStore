import { ProductInformationResponseType, ProductInformationType } from "@/type/ResponseType/ProductInformationType";
import { ProductType } from "@/type/ResponseType/ProductType";
import axios from "axios"

export const getAllProducts = async (page: number, pageSize: number) => {
    const response = await axios.get<ProductType>(`${process.env.API_URL}/api/product/all-products?page=${page}&pageSize=${pageSize}`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch products");
    }
    return response.data;
}

export const getProductsByCategory = async (category: string) => {
    const response = await axios.get<ProductType>(`${process.env.API_URL}/api/product/category/${category}`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch products by category");
    }
    return response.data;
}; 

export const getProductInformationByProductId = async (product_id: string) => {
    const response = await axios.get<ProductInformationResponseType>(`${process.env.API_URL}/api/product/product-info/${product_id}`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch product information");
    }
    return response.data;
};

export const getProductsBySearchQuery = async (query: string) => {
    const response = await axios.get<ProductType>(`${process.env.API_URL}/api/product/search?query=${encodeURIComponent(query)}`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch products by search query");
    }
    return response.data;
};