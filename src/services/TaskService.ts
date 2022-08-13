import { IPostTask } from './../models/Task/IPostTask';
import { IGetTask } from './../models/Task/IGetTask';
import $api from "../http";

export const getTaskService = async () => {
    const response = await $api.get<IGetTask>('/tasks/tasks')
    return response
};

export const postTaskService = async (id, content, priority, status_id) => {
    const response = await $api.post<IPostTask>('/tasks/task', {id, content, priority, status_id})
    return response
};