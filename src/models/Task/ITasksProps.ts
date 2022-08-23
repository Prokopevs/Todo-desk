import { IColumn } from "../dnd/IData"
interface IPriority {
    color: string
    description: string
    index: number
}

export interface IPriorityArray {
    filter(arg0: (item: any) => boolean)
    [K: number]: IPriority
}

export interface ITasksProps {
    task: any
    index?: number
    priorityArray: IPriorityArray
    column: IColumn
}