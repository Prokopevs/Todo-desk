import $api from "../http";
import { ISettings, IUser } from "../Store/reducers/authorization/types";

export const checkAuthService = async () => {
    const response = await $api.get<IUser>('/auth/me')
    return response
};

export const setSettingsService = async ({email, emailConfirmed, name, password, taskTTL}) => {
    const response = await $api.put<ISettings>('/auth/me', {email, emailConfirmed, name, password, taskTTL})
    return response
};