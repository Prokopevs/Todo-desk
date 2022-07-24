import React from "react"
import Priority from "../Priority"
import { Draggable } from "react-beautiful-dnd"

const Tasks = ({ task, index, priorityArray, setOpen, onChangePriority }) => {
    const color = priorityArray[task.priority].color

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
                        <Priority
                            priorityArray={priorityArray}
                            id={task.id}
                            onChangePriority={onChangePriority}
                        />
                    )}
                </div>
            )}
        </Draggable>
    )
}

export default Tasks
