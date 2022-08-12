import React from "react"
import Tasks from "./Tasks"
import { Droppable } from "react-beautiful-dnd"
import { IStatus } from "../../models/IStatus"
import { useAppDispatch } from "../../hooks/redux"
import { deleteStatus } from "../../Store/reducers/dndSlice"

const Status: React.FC<IStatus> = React.memo(({ column, tasks, priorityArray }) => {
    const dispatch = useAppDispatch()

    return (
        <Droppable droppableId={column.id}>
            {(provided) => (
                <li className="col-md-4 block">
                    <div className="block__status-inner">
                        <h1 className="block__status_name">{column.title}</h1>
                        <div
                            className="block__minus"
                            onClick={() => dispatch(deleteStatus(column.id))}
                        >
                            <div className="block__minus-line"></div>
                        </div>
                    </div>
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
                                column={column}
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
