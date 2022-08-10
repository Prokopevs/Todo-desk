import React from "react"
import AddTask from "../AddTask"
import Status from "./Status"
import { IDesk } from "../../models/IDesk"
import { DragDropContext } from "react-beautiful-dnd"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import priorityArray from "../../components/Desk/priorityArray"
import {
    reorderTaskInDifferentStatus,
    reorderTaskInOwnStatus,
    setFinish,
    setResult,
    setStart,
} from "../../Store/reducers/dndSlice"
import SelectModal from "../SelectModal"
import { useSessionStorage } from "../../hooks/useSessionStorage"

const Desk = () => {
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const [changesActive, setChangesActive] = useSessionStorage("SelectChanges", false)
    const data = useAppSelector((state) => state.dndSlice.data)
    console.log(data)

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
            dispatch(reorderTaskInOwnStatus())
            return
        }

        // Moving from one list to another
        dispatch(reorderTaskInDifferentStatus())
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="row margin">
                <div className="col-12 desk">
                    <ul className="row row-padding">
                        {data.columnOrder.map((columnId) => {
                            const column = data.columns[columnId] // id: 'column-1' title: 'To do', taskIds: ['0', '1']
                            const tasks = column.taskIds.map(
                                (taskId) => data.tasks[taskId]
                            )

                            return (
                                <Status
                                    key={column.id}
                                    column={column}
                                    tasks={tasks}
                                    priorityArray={priorityArray}
                                />
                            )
                        })}
                    </ul>
                    {!isAuth && (
                        <p className="demo__description">
                            This is only a demo, all your work will not be saved. Log in
                            to get full functionality
                        </p>
                    )}
                </div>
                <SelectModal changesActive={changesActive} />
                <AddTask
                    changesActive={changesActive}
                    setChangesActive={setChangesActive}
                />
            </div>
        </DragDropContext>
    )
}

export default Desk
