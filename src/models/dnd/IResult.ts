import { IDestination } from "./IDestination"
import { ISource } from "./ISource"

export interface IResult {
    destination: IDestination,
    source: ISource,
    draggableId: string
}