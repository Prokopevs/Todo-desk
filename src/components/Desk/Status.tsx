import React from "react"
import Tasks from "./Tasks"
import { Droppable } from "react-beautiful-dnd"
import { IStatus } from "../../models/dnd/IStatus"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import {
    deleteStatus,
    deleteStatusQuery,
    setLineArray,
} from "../../Store/reducers/dndSlice"
import Line from "./Line"

const Status: React.FC<IStatus> = React.memo(
    ({ column, tasks, priorityArray, index }) => {
        const dispatch = useAppDispatch()
        const columnOrder = useAppSelector((state) => state.dndSlice.data.columnOrder)
        const isAuth = useAppSelector((state) => state.authorizationSlice.isAuth)

        React.useEffect(() => {
            dispatch(setLineArray(Object.keys(columnOrder).length))
        }, [column])

        const handleDelete = () => {
            const obj = {
                column: column,
                isAuth: isAuth,
            }
            isAuth ? dispatch(deleteStatusQuery(obj)) : dispatch(deleteStatus(obj))
        }

        return (
            <Droppable droppableId={column!.id}>
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
                                    onClick={() => handleDelete()}
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
                                        column={column}
                                        priorityArray={priorityArray}
                                        index={index}
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
