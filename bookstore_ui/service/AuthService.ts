import { DataUserResponse, LoginResponse, RegisterResponse, User } from "@/type/UserType";
import { API } from "./RefreshTokenService";

export const registerUser = async (data: User) : Promise<RegisterResponse> => {
    console.log(process.env.API_URL);
    const response = await API.post<RegisterResponse>(`/api/auth/register`, data);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const loginUser = async (data: User) : Promise<LoginResponse> => {
    const response = await API.post<LoginResponse>(`/api/auth/login`, data);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const getDataUser = async () : Promise<DataUserResponse> => {
    const response = await API.get<DataUserResponse>(`/api/auth/me`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const logoutUser = async () : Promise<{message : string}> => {
    const response = await API.post<{message : string}>(`/api/auth/logout`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}