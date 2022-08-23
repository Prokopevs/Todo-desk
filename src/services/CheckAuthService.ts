import $api from "../http";
import { IUser } from "../models/Auth/IUser";

export const checkAuthService = async () => {
    const response = await $api.get<IUser>('/auth/me')
    return response
};