import React from "react"
import Tasks from "./Tasks"
import { Droppable } from "react-beautiful-dnd"
import { IStatus } from "../../models/IStatus"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { deleteStatus, setLineArray } from "../../Store/reducers/dndSlice"
import Line from "./Line"

const Status: React.FC<IStatus> = React.memo(({ column, tasks, priorityArray }) => {
    const dispatch = useAppDispatch()
    const columnId = Number(column.id)
    const lineArrays = useAppSelector((state) => state.dndSlice.lineArrays)
    const columnOrder = useAppSelector((state) => state.dndSlice.data.columnOrder)
    
    React.useEffect(() => {
        dispatch(setLineArray(Object.keys(columnOrder).length))
        // console.log("Status")
    }, [column])
    
    // console.log(lineArrays)
    // console.log(columnId)
    console.log(column.name)
    return (
        <Droppable droppableId={column.id}>
            {(provided) => (
                <>
                    <li className="col-md-4 block">
                        {columnId !== 0 && lineArrays["firstArray"].includes(columnId) && <Line />}
                        <div className="block__status-inner">
                            <h1 className="block__status_name">{column.name}</h1>
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
                        {columnId !== 0 && lineArrays["secondArray"].includes(columnId) && <Line />}
                    </li>
                </>
            )}
        </Droppable>
    )
})

export default Status
