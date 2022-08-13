import $api from "../http";
import { IUser } from "../models/IUser";

export const checkAuthService = async () => {
    const response = await $api.get<IUser>('/auth/me')
    return response
};