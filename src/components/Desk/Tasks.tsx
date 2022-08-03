import React from "react"
import Priority from "../Priority"
import { Draggable } from "react-beautiful-dnd"
import { useAppDispatch } from "../../hooks/redux"
import { setOpenPriorityСolumn } from "../../Store/reducers/dndSlice"
import { ITasksProps } from "../../models/ITasksProps"

const Tasks: React.FC<ITasksProps> = ({ task, index, priorityArray }) => {
    const dispatch = useAppDispatch()
    const color = priorityArray[task.priority].color

    const setOpen = (id: string) => {
        dispatch(setOpenPriorityСolumn(id))
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    className="block__inner_todo"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="block__content">
                        <div
                            className={`pretty__line ${color}`}
                            onClick={() => setOpen(task.id)}
                        ></div>
                        <p className="block__content_text">{task.content}</p>
                    </div>
                    {task.isOpen && (
                        <Priority priorityArray={priorityArray} id={task.id} />
                    )}
                </div>
            )}
        </Draggable>
    )
}

export default Tasks
