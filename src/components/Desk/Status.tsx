import React from "react"
import Tasks from "./Tasks"
import { Droppable } from "react-beautiful-dnd"
import { IStatusProps } from "../../models/IStatusProps"

const Status: React.FC<IStatusProps> = React.memo(
    ({ column, tasks, colorArray, setOpen }) => {
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
                                    colorArray={colorArray}
                                    setOpen={setOpen}
                                />
                            ))}

                            {provided.placeholder}
                        </div>
                    </li>
                )}
            </Droppable>
        )
    }
)

export default Status
