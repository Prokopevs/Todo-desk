import React from "react"
import { ITasksContent } from "../../../../models/ITasksContent"
import TextareaAutosize from "react-textarea-autosize"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { changeTaskContent, changeTaskContentQuery, setQueryFlag } from "../../../../Store/reducers/dndSlice"
import TasksContentEditMode from "./TaskContentEditMode"
import { takeEditArray } from "../../../../Store/reducers/editModeSlice"

interface Inputs {
    id: string
    text: string
    priority: number
    status_id: string
}

const TasksContent: React.FC<ITasksContent> = ({
    
    task,
    editMode,
    priorityArray,
    column,
    setEditMod,
}) => {
    const { priority } = useAppSelector((state) => state.dndSlice.data.tasks[task.id])
    const { queryFlag } = useAppSelector((state) => state.dndSlice)
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
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
        data["priority"] = priority
        data["status_id"] = column.id
        if(isAuth) {
            dispatch(changeTaskContentQuery(data))
        } else {
            dispatch(changeTaskContent(data))
            handleClose()
        }
    }

    React.useEffect(() => {
        if(queryFlag) {
            handleClose()
            dispatch(setQueryFlag(false))
        }
    }, [queryFlag])

    const handleClose = () => {
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
