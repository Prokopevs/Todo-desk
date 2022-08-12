import { ISource } from './../dnd/ISource';
interface ITasks {
    id: string
    content: string
    priority: number
    isOpen: boolean
}

export interface ITasksObj {
    [K: string]: ITasks
}