import React from "react"
import { pen } from "../../../pictures"
import { useAppDispatch } from "../../../hooks/redux"
import TasksContent from "./TaskContent"
import { ITasksProps } from "../../../models/Task/ITasksProps"
import { deleteErrorTaskInfo } from "../../../Store/reducers/errorMessage/slice"
import { addTaskInEditArray } from "../../../Store/reducers/editMode/slice"

const Task: React.FC<ITasksProps> = React.memo(({ task, column, hover }) => {
    const dispatch = useAppDispatch()

    const [editMode, setEditMod] = React.useState(false)

    const onEditClick = () => {
        setEditMod(true)
        dispatch(deleteErrorTaskInfo(task.id))
        dispatch(addTaskInEditArray(task.id))
    }

    return (
        <>
            <div
                className={task.id === hover ? "block__visible" : "block__collapse"}
                data-testid="hover-div"
            >
                <button
                    className={
                        editMode ? "block__inner-editPan active" : "block__inner-editPan"
                    }
                    onClick={onEditClick}
                    data-testid="toggle-btn"
                >
                    <img
                        className="block__inner-editPan-img"
                        src={String(pen)}
                        alt=""
                    ></img>
                </button>
            </div>

            <div className="block__inner_content">
                <div className={editMode ? "block__content editMode" : "block__content"}>
                    <div
                        className={
                            editMode
                                ? "block__content_text_area editMode"
                                : "block__content_text_area"
                        }
                    >
                        <TasksContent
                            task={task}
                            editMode={editMode}
                            column={column}
                            setEditMod={setEditMod}
                        />
                    </div>
                </div>
            </div>
        </>
    )
})

export default Task
