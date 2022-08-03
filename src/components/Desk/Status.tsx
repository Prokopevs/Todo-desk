import React from "react"
import Tasks from "./Tasks"
import { Droppable } from "react-beautiful-dnd"
import { IStatus } from "../../models/IStatus"

const Status: React.FC<IStatus> = React.memo(({ column, tasks, priorityArray }) => {
    return (
        <Droppable droppableId={column.id}>
            {(provided) => (
                <li className="col-md-4 block">
                    <h1 className="block__name">{column.title}</h1>
                    <div
                        className="block__inner"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Tasks
                                key={task.id}
                                task={task}
                                index={index}
                                priorityArray={priorityArray}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                </li>
            )}
        </Droppable>
    )
})

export default Status
