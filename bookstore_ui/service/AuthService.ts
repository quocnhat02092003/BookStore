import { RegisterResponse, User } from "@/type/UserType";
import { API } from "./RefreshTokenService";

export const registerUser = async (data: User) : Promise<RegisterResponse> => {
    const response = await API.post<RegisterResponse>(`/register`, data);
    if (response.status !== 200) {
        throw new Error("Failed to register");
    }
    return response.data;
}