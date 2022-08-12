import React from "react"
import { ITasksContent } from "../../models/ITasksContent"
import TextareaAutosize from "react-textarea-autosize"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch } from "../../hooks/redux"
import { changeTaskContent, deleteTask } from "../../Store/reducers/dndSlice"
import TaskPriority from "./TaskPriority"
import { container, vector } from "../../pictures"

interface Inputs {
    id: string
    text: string
}

const TasksContent: React.FC<ITasksContent> = ({
    task,
    editMode,
    priorityArray,
    column,
    setEditMod,
}) => {
    const dispatch = useAppDispatch()

    const moveCaretAtEnd = (e) => {
        let temp_value = e.target.value
        e.target.value = ""
        e.target.value = temp_value
    }

    const deleteTaskFunc = (id: string) => {
        if (column !== undefined) {
            const obj = {
                id: id,
                column: column,
            }
            dispatch(deleteTask(obj))
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<Inputs>({ mode: "onChange" })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data["id"] = task.id
        dispatch(changeTaskContent(data))
        setEditMod(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {editMode ? (
                <TextareaAutosize
                    className={
                        editMode
                            ? "block__content_input editMode"
                            : "block__content_input"
                    }
                    defaultValue={task.content}
                    autoFocus
                    onFocus={moveCaretAtEnd}
                    autoComplete="off"
                    {...register("text", {
                        required: "cannot be empty",
                    })}
                />
            ) : (
                <p className="block__content_text">{task.content}</p>
            )}

            <div className="error__message">
                {errors?.text && (
                    <p className="error__message_text tasks">{errors?.text?.message}</p>
                )}
            </div>

            <TaskPriority task={task} editMode={editMode} priorityArray={priorityArray} />

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
        </form>
    )
}

export default TasksContent
