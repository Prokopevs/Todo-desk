import React from "react"
import { ITasksContent } from "../../models/ITasksContent"
import TextareaAutosize from "react-textarea-autosize"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch } from "../../hooks/redux"
import { setIsValid } from "../../Store/reducers/contentSlice"
import { changeTaskContent } from "../../Store/reducers/dndSlice"

interface Inputs {
    id: string
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
            values["id"]=task.id
            dispatch(changeTaskContent(values))
            console.log(values)
        }
    }

    const handleClick = () => {
        dispatch(setIsValid(isValid))
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
                    onClick={handleClick}
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
