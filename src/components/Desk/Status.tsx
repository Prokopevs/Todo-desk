import React from "react"
import Tasks from "./Tasks"
import { Droppable } from "react-beautiful-dnd"
import { IStatus } from "../../models/IStatus"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { deleteStatus, setLineValue } from "../../Store/reducers/dndSlice"
import Line from "./Line"

const Status: React.FC<IStatus> = React.memo(({ column, tasks, priorityArray }) => {
    const dispatch = useAppDispatch()
    const columnId = Number(column.id)
    const lineArray = useAppSelector((state) => state.dndSlice.lineArray)
    const columnOrder = useAppSelector((state) => state.dndSlice.data.columnOrder)
    
    dispatch(setLineValue(Object.keys(columnOrder).length))



    return (
        <Droppable droppableId={column.id}>
            {(provided) => (
                <>
                    <li className="col-md-4 block">
                        {columnId !== 0 && lineArray.includes(columnId) && <Line />}
                        <div className="block__status-inner">
                            <h1 className="block__status_name">{column.title}</h1>
                            <button
                                className="block__minus"
                                onClick={() => dispatch(deleteStatus(column.id))}
                            >
                                <div className="block__minus-line"></div>
                            </button>
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
                        {columnId !== 0 && lineArray[lineArray.length - 1] - 2 === columnId && <Line />}
                    </li>
                </>
            )}
        </Droppable>
    )
})

export default Status
