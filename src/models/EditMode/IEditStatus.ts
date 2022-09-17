import { IColumn } from "../../Store/reducers/dnd/types";

export interface IEditStatus {
    column: IColumn
    setChangeName: (...args: boolean[]) => void
}