import { IColumn, ITask } from "../../Store/reducers/dnd/types"

export interface IStatus {
    column: IColumn
    tasks: ITask[]
    index: number
    setMSA: (...arg: boolean[]) => void
};