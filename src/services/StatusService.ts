import $api from "../http";
import { IChangeStatus } from "../models/Status/IChangeStatus";
import { IDelete } from "../models/Status/IDelete";
import { IStatusQuery } from "../models/Status/IStatusQuery";

export const getStatusService = async () => {
    const response = await $api.get<IStatusQuery>('/tasks/statuses')
    return response
};

export const postStatusService = async (id, name, parentId) => {
    const response = await $api.post<IStatusQuery>('/tasks/status', {id, name, parentId})
    return response
};

export const deleteStatusService = async (id) => {
    const response = await $api.delete<IDelete>(`/tasks/status/${id}`)
    return response
};

export const changeNameStatusService = async (id, name) => {
    const response = await $api.put<IChangeStatus>('/tasks/status/name', {id, name})
    return response
};