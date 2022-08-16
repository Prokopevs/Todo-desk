import React from "react"
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux"
import { ITasksContentEditMode } from "../../../../../models/ITasksContent"
import { container, vector } from "../../../../../pictures"
import { deleteTaskQuery, deleteTask } from "../../../../../Store/reducers/dndSlice"

const TaskSelect:React.FC<ITasksContentEditMode> = ({ task, editMode, isValid, column }) => {
    const dispatch = useAppDispatch()
    const { isOpen } = useAppSelector((state) => state.dndSlice.data.tasks[task.id])
    const { opasityButtons } = useAppSelector((state) => state.editModeSlice)
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)

    const deleteTaskFunc = (id: string) => {
        if (column !== undefined) {
            const obj = {
                id: id,
                column: column,
                isAuth: isAuth
            }
            if (isAuth) {
                dispatch(deleteTaskQuery(obj)) 
            } else {
                dispatch(deleteTask(obj))
            }
        }
    }

    return (
        <>
            {editMode && (
                <>
                    <div className="block__line block__line-task block__line-task-mt"></div>
                    <div className="block__content_selection">
                        <button
                            className="block__content_selection_button delete"
                            onClick={() => deleteTaskFunc(task.id)}
                            disabled={opasityButtons["delete"].includes(task.id)}
                        >
                            <img
                                className="block__content_selection_img delete"
                                src={String(container)}
                                alt=""
                            ></img>
                            <p className="block__content_selection_text">Delete</p>
                        </button>

                        <button
                            className="block__content_selection_button apply"
                            type="submit"
                            disabled={!isValid || isOpen || opasityButtons["apply"].includes(task.id)}
                        >
                            <img
                                className="block__content_selection_img apply"
                                src={String(vector)}
                                alt=""
                            ></img>
                            <p className="block__content_selection_text">Apply</p>
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default TaskSelect
