import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { ITasksProps } from "../../models/ITasksProps"
import TasksContent from "./TasksContent"
import { pen } from "../../pictures"

const Tasks: React.FC<ITasksProps> = React.memo(
    ({ task, index, priorityArray, column }) => {
        const color = priorityArray[task.priority].color

        const [editMode, setEditMod] = React.useState(false)

        const onEditClick = () => {
            if (!editMode) {
                setEditMod(true)
            }
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
                            className={
                                editMode
                                    ? "block__inner-editPan active"
                                    : "block__inner-editPan"
                            }
                            onClick={onEditClick}
                        >
                            <img
                                className="block__inner-editPan-img"
                                src={String(pen)}
                                alt=""
                            ></img>
                        </div>

                        <div className="block__inner_content">
                            <div className={editMode ? "block__content editMode" : "block__content"}>
                                <div
                                    className={editMode ? `` : `pretty__line ${color}`}
                                ></div>
                                <div className="block__content_text_area">
                                    <TasksContent
                                        task={task}
                                        editMode={editMode}
                                        priorityArray={priorityArray}
                                        column={column}
                                        setEditMod={setEditMod}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
)

export default Tasks
