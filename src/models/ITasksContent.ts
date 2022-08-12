import { IColumn } from "./dnd/IData"
export interface ITasksContent {
    task: any
    editMode: boolean
    priorityArray: any
    column?: IColumn
    setEditMod: (...args: boolean[]) => void
}

export interface ITasksPrioritySelect {
    task: any
    editMode: boolean
    priorityArray: any
}