import { IColumn, ITask } from "../../Store/reducers/dnd/types"
interface IPriority {
    color: string
    description: string
    index: number
}

export interface IPriorityArray {
    filter(arg0: (item: IPriority) => boolean)
    [K: number]: IPriority
}

export interface ITasksProps {
    task: ITask
    index?: number
    column: IColumn
    hover?: string
}