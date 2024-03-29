import React from "react"
import { ITasksContent } from "../../../../models/Task/ITasksContent"
import TextareaAutosize from "react-textarea-autosize"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import {
    changeTaskContent,
    changeTaskContentQuery,
} from "../../../../Store/reducers/dnd/slice"
import TasksContentEditMode from "./TaskContentEditMode"
import {
    deleteTaskInEditArray,
    deleteTaskInSuccessArray,
} from "../../../../Store/reducers/editMode/slice"
import { selectAuthorization, selectEditMode } from "../../../../Store/selectors"
import { motion, AnimatePresence } from "framer-motion"
import { deleteErrorTaskInfo } from "../../../../Store/reducers/errorMessage/slice"
import priorityArray from "../../../../data/Desk/priorityArray"

interface Inputs {
    id: string
    content: string
    priority: number
    status_id: string
}

const TasksContent: React.FC<ITasksContent> = ({
    task,
    editMode,
    column,
    setEditMod,
}) => {
    const { priority } = useAppSelector((state) => state.dndSlice.data.tasks[task.id])
    const { isAuth } = useAppSelector(selectAuthorization)
    const { prevTaskObj, successTasksAfterSagaRequest } = useAppSelector(selectEditMode)
    const dispatch = useAppDispatch()
    const color = priorityArray[task.priority - 1]?.color
    const moveCaretAtEnd = (e) => {
        let temp_value = e.target.value
        e.target.value = ""
        e.target.value = temp_value
    }
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Inputs>({ mode: "onChange" })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data["id"] = task.id
        data["priority"] = priority
        data["status_id"] = column!.id
        if (isAuth) {
            dispatch(deleteErrorTaskInfo(task.id))
            if (
                prevTaskObj[task.id].priority !== priority ||
                prevTaskObj[task.id].content !== data.content
            ) {
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
        if (successTasksAfterSagaRequest?.includes(task.id)) {
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
            <AnimatePresence>
                {editMode ? (
                    <div role="textarea">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            style={{ overflow: "hidden" }}
                        >
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
                        </motion.div>
                    </div>
                ) : (
                    <div className="task__content">
                        <div className={`pretty__line ${color}`}></div>
                        <p className="block__content_text">{task.content}</p>
                    </div>
                )}
            </AnimatePresence>

            <div className="error__message">
                {errors?.content && (
                    <p className="error__message_text tasks">
                        {errors?.content?.message}
                    </p>
                )}
            </div>

            <AnimatePresence>
                {editMode && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        style={{ overflow: "hidden" }}
                    >
                        <TasksContentEditMode
                            task={task}
                            isValid={isValid}
                            column={column}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    )
}

export default TasksContent
