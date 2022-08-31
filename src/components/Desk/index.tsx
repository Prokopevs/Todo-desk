import React from "react"
import AddTask from "../AddTask"
import Status from "./Status"
import { DragDropContext } from "react-beautiful-dnd"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import priorityArray from "../../data/Desk/priorityArray"
import {
    reorderTaskInDifferentStatus,
    reorderTaskInOwnStatus,
    setFinish,
    setResult,
    setStart,
} from "../../Store/reducers/dndSlice"
import { selectDnd, selectAuthorization } from "../../Store/selectors"

const Desk = () => {
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector(selectAuthorization)
    const { data } = useAppSelector(selectDnd)
    let columnsLength
    if(data) {
        columnsLength = Object.keys(data.columns).length
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result
        dispatch(setResult(result))

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const start = data.columns[source.droppableId] // в каком статусе была взята таска
        const finish = data.columns[destination.droppableId] // куда отправилась таска
        dispatch(setStart(start))
        dispatch(setFinish(finish))

        // Moving in one list
        if (start === finish) {
            dispatch(reorderTaskInOwnStatus(isAuth))
            return
        }

        // Moving from one list to another
        dispatch(reorderTaskInDifferentStatus(isAuth))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="row margin">
                <div className="col-12 desk">
                    <ul className="row row-padding">
                        {columnsLength ? (
                            data.columnOrder.map((columnId, index) => {
                                const column = data.columns[columnId] // id: '1' name: 'To do', taskIds: ['0', '1']
                                const tasks = column.taskIds.map(
                                    (taskId) => data.tasks[taskId]
                                )
                                return (
                                    <Status
                                        key={column.id}
                                        column={column}
                                        tasks={tasks}
                                        priorityArray={priorityArray}
                                        index={index+1}
                                    />
                                )
                            })
                        ) : (
                            <div className="demo__center">
                                <p className="demo__text">
                                    Click on plus to add status
                                </p>
                            </div>
                        )}
                    </ul>
                    {!isAuth && (
                        <p className="demo__description">
                            This is only a demo, all your work will not be saved. Log in
                            to get full functionality.
                        </p>
                    )}
                </div>
                <AddTask />
            </div>
        </DragDropContext>
    )
}

export default Desk
