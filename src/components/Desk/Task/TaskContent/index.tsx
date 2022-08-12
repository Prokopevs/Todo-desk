import React from "react"
import { ITasksContent } from "../../../../models/ITasksContent"
import TextareaAutosize from "react-textarea-autosize"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch } from "../../../../hooks/redux"
import { changeTaskContent } from "../../../../Store/reducers/dndSlice"
import TasksContentEditMode from "./TaskContentEditMode"
import { takeEditArray } from "../../../../Store/reducers/editModeSlice"

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

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<Inputs>({ mode: "onChange" })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data["id"] = task.id // add if(isDirty, isValid)
        dispatch(changeTaskContent(data))
        setEditMod(false)
        dispatch(takeEditArray(task.id))
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

            <TasksContentEditMode
                task={task}
                editMode={editMode}
                priorityArray={priorityArray}
                isValid={isValid}
                column={column}
            />
        </form>
    )
}

export default TasksContent
