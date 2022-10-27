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

export const setConfirmEmailService = async ( token: string ) => {
    const response = await $api.get(`/auth/confirm_email/${token}`)
    return response
};

export const setTTLService = async () => {
    const response = await $api.get<number[]>('/auth/task_ttls')
    return response
};