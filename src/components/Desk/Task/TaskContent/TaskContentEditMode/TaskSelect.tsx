import React from "react"
import { useAppDispatch } from "../../../../../hooks/redux"
import { ITasksContentEditMode } from "../../../../../models/ITasksContent"
import { container, vector } from "../../../../../pictures"
import { deleteTask } from "../../../../../Store/reducers/dndSlice"

const TaskSelect:React.FC<ITasksContentEditMode> = ({ task, editMode, isValid, column }) => {
    const dispatch = useAppDispatch()

    const deleteTaskFunc = (id: string) => {
        if (column !== undefined) {
            const obj = {
                id: id,
                column: column,
            }
            dispatch(deleteTask(obj))
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
                            disabled={!isValid}
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
