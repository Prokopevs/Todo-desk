import React from "react"
import { ITasksContentEditMode } from "../../../../../models/ITasksContent"
import TaskPriority from "./TaskPriority"
import TaskSelect from "./TaskSelect"

const TasksContentEditMode: React.FC<ITasksContentEditMode> = ({
    task,
    editMode,
    priorityArray,
    isValid,
    column
}) => {
    return (
        <>
            <TaskPriority task={task} editMode={editMode} priorityArray={priorityArray} />
            <TaskSelect task={task} editMode={editMode} isValid={isValid} column={column} />
        </>
    )
}

export default TasksContentEditMode
