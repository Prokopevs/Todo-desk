import React from "react"
import Tasks from "./Tasks"
import { Droppable } from "react-beautiful-dnd"
import { IStatus } from "../../models/IStatus"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { deleteStatus, setLineArray } from "../../Store/reducers/dndSlice"
import Line from "./Line"

const Status: React.FC<IStatus> = React.memo(
    ({ column, tasks, priorityArray, index }) => {
        const dispatch = useAppDispatch()
        const columnOrder = useAppSelector((state) => state.dndSlice.data.columnOrder)

        React.useEffect(() => {
            dispatch(setLineArray(Object.keys(columnOrder).length))
        }, [column])

        return (
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <>
                        <li className="col-md-4 block">
                            <Line array={"firstArray"} index={index} />
                            <div className="block__status-inner">
                                <div className="block__wrapper">
                                    <h1 className="block__status_name">{column.name}</h1>
                                </div>
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
                            <Line array={"secondArray"} index={index} />
                        </li>
                    </>
                )}
            </Droppable>
        )
    }
)

export default Status
