import React from "react"
import { pen } from "../../../pictures"
import { addTaskInEditArray } from "../../../Store/reducers/editModeSlice"
import { useAppDispatch } from "../../../hooks/redux"
import TasksContent from "./TaskContent"
import { ITasksProps } from "../../../models/ITasksProps"

const Task: React.FC<ITasksProps> = React.memo(
    ({ task, index, priorityArray, column }) => {
        const dispatch = useAppDispatch()

        const color = priorityArray[task.priority - 1].color
        const [editMode, setEditMod] = React.useState(false)

        const onEditClick = () => {
            setEditMod(true)
            dispatch(addTaskInEditArray(task.id))
        }

        return (
            <>
                <button
                    className={
                        editMode ? "block__inner-editPan active" : "block__inner-editPan"
                    }
                    onClick={onEditClick}
                >
                    <img
                        className="block__inner-editPan-img"
                        src={String(pen)}
                        alt=""
                    ></img>
                </button>

                <div className="block__inner_content">
                    <div
                        className={
                            editMode ? "block__content editMode" : "block__content"
                        }
                    >
                        <div className={editMode ? `` : `pretty__line ${color}`}></div>
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
            </>
        )
    }
)

export default Task
