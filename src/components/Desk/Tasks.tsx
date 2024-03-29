import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { ITasksProps } from "../../models/Task/ITasksProps"
import { useAppSelector } from "../../hooks/redux"
import Task from "./Task"
import { selectAuthorization, selectEditMode, selectError } from "../../Store/selectors"

const Tasks: React.FC<ITasksProps> = ({ task, index, column }) => {
    const { editArray } = useAppSelector(selectEditMode)
    const [hover, setHover] = React.useState("")
    const { errorTaskInfo } = useAppSelector(selectError)
    const { isAuth } = useAppSelector(selectAuthorization)

    const handleMouseOver = (id: string) => {
        setHover(id)
    }

    const handleMouseOut = (id: string) => {
        setHover("")
    }

    return (
        <Draggable
            draggableId={task.id}
            index={index}
            isDragDisabled={editArray?.includes(task.id)}
        >
            {(provided) => (
                <div
                    className="block__inner_todo"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onMouseOver={() => {
                        handleMouseOver(task.id)
                    }}
                    onMouseOut={() => {
                        handleMouseOut(task.id)
                    }}
                >
                    <Task task={task} column={column} hover={hover} />
                    {isAuth && errorTaskInfo[task.id]?.message && (
                        <div className="error_info tasks">
                            {errorTaskInfo[task.id]?.message}
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    )
}

export default Tasks
