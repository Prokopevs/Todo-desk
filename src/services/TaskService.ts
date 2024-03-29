import { IPostTask } from './../models/Task/IPostTask';
import { IGetTask } from './../models/Task/IGetTask';
import $api from "../http";
import { IPutTask } from '../models/Task/IPutTask';
import { IDeleteTaskQuery } from '../models/Task/IDeleteTaskQuery';

export const getTaskService = async () => {
    const response = await $api.get<IGetTask>('/tasks/tasks')
    return response
};

export const postTaskService = async (content:string, id:number, priority:number, status_id:number) => {
    const response = await $api.post<IPostTask>('/tasks/task', {content, id, priority, status_id})
    return response
};

export const putTaskService = async (content: string, id:number, priority:number, status_id:number) => {
    const response = await $api.put<IPutTask>('/tasks/task', {content, id, priority, status_id})
    return response
};

export const deleteTaskService = async (id:string) => {
    const response = await $api.delete<IDeleteTaskQuery>(`/tasks/task/${id}`)
    return response
};