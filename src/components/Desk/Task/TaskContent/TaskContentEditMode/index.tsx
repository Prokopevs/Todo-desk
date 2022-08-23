import React from "react"
import { ITasksContentEditMode } from "../../../../../models/Task/ITasksContent"
import TaskPriority from "./TaskPriority"
import TaskSelect from "./TaskSelect"

const TasksContentEditMode: React.FC<ITasksContentEditMode> = ({
    task,
    priorityArray,
    isValid,
    column
}) => {
    return (
        <>
            <TaskPriority task={task} priorityArray={priorityArray} />
            <TaskSelect task={task} isValid={isValid} column={column} />
        </>
    )
}

export default TasksContentEditMode
