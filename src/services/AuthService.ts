import $api, { API_URL } from "../http";
import axios, {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return await axios.post<AuthResponse>(`${API_URL}/auth/login`, {email, password})
    }

    static async registration(email: string, name: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return await axios.post<AuthResponse>(`${API_URL}/auth/register`, {email, name, password})
    }
}