import React from "react"
import { ITasksContent } from "../../models/ITasksContent"
import TextareaAutosize from "react-textarea-autosize"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch } from "../../hooks/redux"
import { setIsValid } from "../../Store/reducers/contentSlice"

interface Inputs {
    text: string
}

const TasksContent: React.FC<ITasksContent> = ({ task, editMode }) => {
    const dispatch = useAppDispatch()

    const moveCaretAtEnd = (e) => {
        let temp_value = e.target.value
        e.target.value = ""
        e.target.value = temp_value
    }

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors, isDirty, isValid },
    } = useForm<Inputs>({ mode: "onChange" })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }

    const handleBlur = () => {
        dispatch(setIsValid(isValid))
        const values = getValues()
        if (isDirty && isValid) {
            console.log(values)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {editMode ? (
                <TextareaAutosize
                    className="block__content_input"
                    defaultValue={task.content}
                    autoFocus
                    onFocus={moveCaretAtEnd}
                    autoComplete="off"
                    {...register("text", {
                        required: "cannot be empty",
                    })}
                    onBlur={handleBlur}
                />
            ) : (
                <p className="block__content_text">{task.content}</p>
            )}

            <div className="error__message">
                {errors?.text && (
                    <p className="error__message_text">{errors?.text?.message}</p>
                )}
            </div>
        </form>
    )
}

export default TasksContent
