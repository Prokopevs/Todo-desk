import React from "react"
import Priority from "../Priority"
import { Draggable } from "react-beautiful-dnd"

const Tasks = ({ task, index, colorArray, setOpen }) => {
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
                            className={`pretty__line ${colorArray[task.priority]}`}
                            onClick={() => setOpen(task.id)}
                        ></div>
                        <p className="block__content_text">{task.content}</p>
                    </div>
                    {task.isOpen && <Priority />}
                </div>
            )}
        </Draggable>
    )
}

export default Tasks
