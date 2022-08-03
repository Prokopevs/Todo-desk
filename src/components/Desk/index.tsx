import React from "react"
import AddTask from "../AddTask"
import Status from "./Status"
import { IDesk } from "../../models/IDesk"
import { DragDropContext } from "react-beautiful-dnd"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import priorityArray from "../../components/Desk/priorityArray";
import {
    reorderTaskInDifferentStatus,
    reorderTaskInOwnStatus,
    setFinish,
    setResult,
    setStart,
} from "../../Store/reducers/dndSlice"

const Desk: React.FC<IDesk> = (props) => {
    const data = useAppSelector((state) => state.dndSlice.data)
    const dispatch = useAppDispatch()

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

                    <AddTask active={props.active} setActive={props.setActive} />
                </div>
            </div>
        </DragDropContext>
    )
}

export default Desk
