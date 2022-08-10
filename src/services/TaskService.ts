import { IPostTask } from './../models/Task/IPostTask';
import { IGetTask } from './../models/Task/IGetTask';
import $api from "../http";

export const getTaskService = async () => {
    const response = await $api.get<IGetTask>('/tasks/tasks')
    return response
};

export const postTaskService = async (id, name, priority) => {
    const response = await $api.post<IPostTask>('/tasks/tasks', {id, name, priority})
    return response
};