import { IColumn } from "../dnd/IData"

export interface IButtonPlus {
    position: string
    column: IColumn
    setMSA: (...args: boolean[]) => void
}