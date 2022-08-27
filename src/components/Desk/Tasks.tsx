import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { ITasksProps } from "../../models/Task/ITasksProps"
import { useAppSelector } from "../../hooks/redux"
import Task from "./Task"
import { selectEditMode } from "../../Store/selectors"

const Tasks: React.FC<ITasksProps> = ({ task, index, priorityArray, column }) => {
    const { editArray } = useAppSelector(selectEditMode)
    const [hover, setHover] = React.useState("")

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
                    <Task
                        task={task}
                        priorityArray={priorityArray}
                        column={column}
                        hover={hover}
                    />
                </div>
            )}
        </Draggable>
    )
}

export default Tasks
