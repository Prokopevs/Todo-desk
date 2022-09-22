import { ISource } from '../../../models/dnd/ISource';
import { IDestination } from './../../../models/dnd/IDestination';

export interface IChangeTaskContent {
    id: string
    content: string 
    priority: number
    status_id: string
}

export interface IChangeStatus {
    id: string
    name: string
}

export interface IAddStatus {
    id?: number
    name: string
    parentId: number
    isAuth: boolean
}

export interface IAddTask {
    id?: number
    priority: number
    content: string
    status_id: string
    isAuth: boolean
}

export interface IDeleteStatus {
    column: IColumn
    isAuth: boolean | null
}

export interface IDeleteTask {
    id: string
    column: IColumn
    isAuth: boolean
}

export interface IPriority {
    id: string
    index: number 
}

export interface IColumn {
    id: string
    name: string
    taskIds: string[]
}

export interface IColumns {
    [K: string]: IColumn
}

export interface ITask {
    id: string
    content: string
    priority: number
    isOpen: boolean
}

export interface ITasks {
    [K: string]: ITask
}

export interface IResult {
    destination: IDestination,
    source: ISource,
    draggableId: string
}

export interface ITasksObj {
    [K: string]: ITask
}

export interface IStatusObj {
    [K: string]: IColumn
}