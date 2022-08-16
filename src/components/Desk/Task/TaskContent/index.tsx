import React from "react"
import { ITasksContent } from "../../../../models/ITasksContent"
import TextareaAutosize from "react-textarea-autosize"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { changeTaskContent, changeTaskContentQuery } from "../../../../Store/reducers/dndSlice"
import TasksContentEditMode from "./TaskContentEditMode"
import { deleteTaskInEditArray, deleteTaskInSuccessArray } from "../../../../Store/reducers/editModeSlice"

interface Inputs {
    id: string
    content: string
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
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const { prevTaskObj, successTasksAfterSagaRequest } = useAppSelector((state) => state.editModeSlice)
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
        data["id"] = task.id 
        data["priority"] = priority
        data["status_id"] = column.id   
        if(isAuth) {
            if(prevTaskObj[task.id].priority !== priority  || prevTaskObj[task.id].content !== data.content) {
                dispatch(changeTaskContentQuery(data))
            } else {
                handleClose()
            }
        } else {
            dispatch(changeTaskContent(data))
            handleClose()
        }      
    }

    React.useEffect(() => {
        if(successTasksAfterSagaRequest.includes(task.id)) {
            handleClose()
            dispatch(deleteTaskInSuccessArray(task.id))
        }
    }, [successTasksAfterSagaRequest])

    const handleClose = () => {
        setEditMod(false)
        dispatch(deleteTaskInEditArray(task.id)) // удалить таску из (массива с тасками) которые редактируются
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
                    {...register("content", {
                        required: "cannot be empty",
                    })}
                />
            ) : (
                <p className="block__content_text">{task.content}</p>
            )}

            <div className="error__message">
                {errors?.content && (
                    <p className="error__message_text tasks">{errors?.content?.message}</p>
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
