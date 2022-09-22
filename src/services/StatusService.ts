import $api from "../http";
import { IDelete } from "../models/Status/IDelete";
import { IStatusQuery } from "../models/Status/IStatusQuery";
import { IChangeStatus } from "../Store/reducers/dnd/types";

export const getStatusService = async () => {
    const response = await $api.get<IStatusQuery>('/tasks/statuses')
    return response
};

export const postStatusService = async (id:number, name:string, parentId:number) => {
    const response = await $api.post<IStatusQuery>('/tasks/status', {id, name, parentId})
    return response
};

export const deleteStatusService = async (id:string) => {
    const response = await $api.delete<IDelete>(`/tasks/status/${id}`)
    return response
};

export const changeNameStatusService = async (id:number, name:string) => {
    const response = await $api.put<IChangeStatus>('/tasks/status/name', {id, name})
    return response
};