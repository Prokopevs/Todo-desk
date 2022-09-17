import { IColumn } from "../../Store/reducers/dnd/types"

export interface IButtonPlus {
    position: string
    column: IColumn
    setMSA: (...args: boolean[]) => void
}
export interface IButtonMinus {
    column: IColumn
}