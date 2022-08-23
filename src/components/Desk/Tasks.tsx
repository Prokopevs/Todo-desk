import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { ITasksProps } from "../../models/ITasksProps"
import { useAppSelector } from "../../hooks/redux"
import Task from "./Task"
import { selectEditMode } from "../../Store/selectors";

const Tasks: React.FC<ITasksProps> = React.memo(
    ({ task, index, priorityArray, column }) => {
        const { editArray } = useAppSelector(selectEditMode)

        return (
            <>
                {!editArray.includes(task.id) ? (
                    <Draggable draggableId={task.id} index={index}>
                        {(provided) => (
                            <div
                                className="block__inner_todo"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <Task task={task} priorityArray={priorityArray} column={column}/>
                            </div>
                        )}
                    </Draggable>
                ) : (
                    <Draggable draggableId={task.id} index={index}>
                        {(provided) => (
                            <div
                                className="block__inner_todo"
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                            >
                                <Task task={task} priorityArray={priorityArray} column={column}/>
                            </div>
                        )}
                    </Draggable>
                )}
            </>
        )
    }
)

export default Tasks
