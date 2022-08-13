import $api from "../http";
import { IStatusQuery } from "../models/Status/IStatusQuery";

export const getStatusService = async () => {
    const response = await $api.get<IStatusQuery>('/tasks/statuses')
    return response
};

export const postStatusService = async (id, name, priority) => {
    const response = await $api.post<IStatusQuery>('/tasks/status', {id, name, priority})
    return response
};