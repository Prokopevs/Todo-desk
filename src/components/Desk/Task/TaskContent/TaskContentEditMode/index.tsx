import React from "react"
import { ITasksContentEditMode } from "../../../../../models/Task/ITasksContent"
import TaskPriority from "./TaskPriority"
import TaskSelect from "./TaskSelect"

const TasksContentEditMode: React.FC<ITasksContentEditMode> = ({
    task,
    isValid,
    column,
}) => {
    return (
        <>
            <TaskPriority task={task} />
            <TaskSelect task={task} isValid={isValid} column={column} />
        </>
    )
}

export default TasksContentEditMode
