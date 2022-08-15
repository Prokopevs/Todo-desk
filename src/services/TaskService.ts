import { IPostTask } from './../models/Task/IPostTask';
import { IGetTask } from './../models/Task/IGetTask';
import $api from "../http";
import { IPutTask } from '../models/Task/IPutTask';
import { IDeleteTaskQuery } from '../models/Task/IDeleteTaskQuery';

export const getTaskService = async () => {
    const response = await $api.get<IGetTask>('/tasks/tasks')
    return response
};

export const postTaskService = async (id, content, priority, status_id) => {
    const response = await $api.post<IPostTask>('/tasks/task', {id, content, priority, status_id})
    return response
};

export const putTaskService = async (text, id, priority, status_id) => {
    const response = await $api.put<IPutTask>('/tasks/task', {text, id, priority, status_id})
    return response
};

export const deleteTaskService = async (id) => {
    const response = await $api.delete<IDeleteTaskQuery>(`/tasks/task/${id}`)
    return response
};