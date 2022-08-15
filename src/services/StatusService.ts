import $api from "../http";
import { IDelete } from "../models/Status/IDelete";
import { IStatusQuery } from "../models/Status/IStatusQuery";

export const getStatusService = async () => {
    const response = await $api.get<IStatusQuery>('/tasks/statuses')
    return response
};

export const postStatusService = async (id, name, priority) => {
    const response = await $api.post<IStatusQuery>('/tasks/status', {id, name, priority})
    return response
};

export const deleteStatusService = async (id) => {
    const response = await $api.delete<IDelete>(`/tasks/status/${id}`)
    return response
};