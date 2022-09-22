import { IColumn, ITask } from "../../Store/reducers/dnd/types"
import { IPriorityArray } from "./ITasksProps"

export interface ITasksContent {
    task: ITask
    editMode: boolean
    column?: IColumn
    setEditMod: (...args: boolean[]) => void
}

export interface ITasksContentEditMode {
    task: ITask
    isValid?:boolean
    column?: IColumn
}