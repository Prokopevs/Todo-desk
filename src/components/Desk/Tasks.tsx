import React from "react"
import Priority from "../Priority"
import { Draggable } from "react-beautiful-dnd"
import { useAppDispatch } from "../../hooks/redux"
import { deleteTask, setOpenPriorityСolumn } from "../../Store/reducers/dndSlice"
import { ITasksProps } from "../../models/ITasksProps"
import TasksContent from "./TasksContent"

const Tasks: React.FC<ITasksProps> = ({ task, index, priorityArray, column }) => {
    const dispatch = useAppDispatch()
    const color = priorityArray[task.priority].color

    const setOpen = (id: string) => {
        dispatch(setOpenPriorityСolumn(id))
    }

    const deleteTaskFunc = (id: string) => {
        const obj = {
            id: id,
            column: column,
        }
        dispatch(deleteTask(obj))
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    className="block__inner_todo"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div
                        className="block__inner_delete"
                        onClick={() => deleteTaskFunc(task.id)}
                    >
                        <div className="close__button task"></div>
                    </div>
                    <div className="block__inner_content">
                        <div className="block__content">
                            <div
                                className={`pretty__line ${color}`}
                                onClick={() => setOpen(task.id)}
                            ></div>
                            <TasksContent task={task} />
                        </div>
                    </div>

                    {task.isOpen && (
                        <Priority priorityArray={priorityArray} id={task.id} />
                    )}
                </div>
            )}
        </Draggable>
    )
}

export default Tasks
