import React from "react"
import { ITasksContent } from "../../models/ITasksContent"
import TextareaAutosize from "react-textarea-autosize"
import { useForm, SubmitHandler } from "react-hook-form"

interface Inputs {
    text: string
}

const TasksContent: React.FC<ITasksContent> = ({ task, editMode, control }) => {
    const moveCaretAtEnd = (e) => {
        let temp_value = e.target.value
        e.target.value = ""
        e.target.value = temp_value
    }
    // const [value, setValue] = React.useState(task.content)
    // const onChange = (event) => setValue(event.target.value)

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onChange" })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        reset()
    }

    const handleBlur = () => {
        const values = getValues()
        console.log(values)
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
        </form>
    )
}

export default TasksContent
