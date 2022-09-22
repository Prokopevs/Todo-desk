import axios from 'axios';

export const API_URL = process.env.REACT_APP_MY_API_KEY

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api;