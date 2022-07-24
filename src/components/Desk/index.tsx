import React from "react"
import AddTask from "../AddTask"
import Status from "./Status"
import initialData from "./initial-data"
import { IDesk } from "../../models/IDesk"
import { DragDropContext } from "react-beautiful-dnd"

const Desk: React.FC<IDesk> = (props) => {
    const [state, setState] = React.useState(initialData)

    const priorityArray = [
        { color: "purple", description: "Very High" },
        { color: "red", description: "High" },
        { color: "green", description: "Normal" },
        { color: "blue", description: "Low" },
        { color: "lightblue", description: "Very Low" },
    ]

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const start = state.columns[source.droppableId]
        const finish = state.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            }

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            }

            setState(newState)
            return
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        }

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        }
        setState(newState)
    }

    const setOpen = (id) => {
        const task = state.tasks[id]

        const newOpen = {
            ...task,
            isOpen: !task.isOpen,
        }

        const newState = {
            ...state,
            tasks: {
                ...state.tasks,
                [id]: newOpen,
            },
        }
        setState(newState)
    }

    const onChangePriority = (id, index) => {
        const task = state.tasks[id]

        const newPriority = {
            ...task,
            priority: index,
        }

        const newState = {
            ...state,
            tasks: {
                ...state.tasks,
                [id]: newPriority,
            },
        }
        setState(newState)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="row margin">
                <div className="col-12 desk">
                    <ul className="row row-padding">
                        {state.columnOrder.map((columnId) => {
                            const column = state.columns[columnId] // id: 'column-1' title: 'To do', taskIds: ['task-1', 'task-2']
                            const tasks = column.taskIds.map(
                                (taskId) => state.tasks[taskId]
                            )

                            return (
                                <Status
                                    key={column.id}
                                    column={column}
                                    tasks={tasks}
                                    priorityArray={priorityArray}
                                    setOpen={setOpen}
                                    onChangePriority={onChangePriority}
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
