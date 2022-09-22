import { ITask } from "../../Store/reducers/dnd/types"
import { IPriorityArray } from "../Task/ITasksProps"
export interface IPriorityProps {
    priorityArray: IPriorityArray
    task: ITask
}