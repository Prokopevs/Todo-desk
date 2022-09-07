import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import PriorityButtons from "../PriorityButtons"
import { addTask, addTaskQuery, setQueryFlag } from "../../Store/reducers/dndSlice"
import priorityArray from "../../data/Desk/priorityArray"
import { deleteErrorInfo } from "../../Store/reducers/errorMessageSlice"
import { selectDnd, selectError, selectAuthorization, selectEditMode } from "../../Store/selectors"
import { IModalTask, IStorage } from "../../models/EditMode/IStorage"

interface Inputs {
    content: string
    priority: number
    status_id: string
    isAuth: boolean
}

const TaskModalWindow: React.FC<IModalTask> = ({ modalTA, setMTA }) => {
    const dispatch = useAppDispatch()
    const [changePriority, setChangePriority] = React.useState(false)
    const { priority } = useAppSelector((state) => state.prioritySlice)
    const { data, queryFlag } = useAppSelector(selectDnd)
    const { isAuth } = useAppSelector(selectAuthorization)
    const { errorInfo } = useAppSelector(selectError)
    const { queryLoading } = useAppSelector(selectEditMode)
    const firstItemOfColumnOrder = data.columnOrder[0]

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onBlur" })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(deleteErrorInfo())
        data["priority"] = priority
        data["status_id"] = firstItemOfColumnOrder
        data["isAuth"] = isAuth!
        if (isAuth) {
            dispatch(addTaskQuery(data))
        } else {
            dispatch(addTask(data))
            closeTaskWindow()
        }
    }

    React.useEffect(() => {
        if (queryFlag) {
            closeTaskWindow()
            dispatch(setQueryFlag(false))
        }
    }, [queryFlag])

    const closeTaskWindow = () => {
        dispatch(deleteErrorInfo())
        setMTA(false)
        setTimeout(() => reset(), 200)
        setTimeout(() => setChangePriority(false), 200)
    }

    return (
        <CSSTransition
            in={modalTA}
            timeout={150}
            classNames="my-node"
            unmountOnExit
        >
            <div className="modalWindow">
                <div className="modalWindow_content">
                    <div className="form_container form_container-modalWindow">
                        <p className="modalWindow__text text-center">Add task</p>
                        <div className="block__line block__line-form"></div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p className="modalWindow__text-description">Content</p>
                            <div
                                className={
                                    errors?.content
                                        ? "form__input_holder error-holder"
                                        : "form__input_holder"
                                }
                            >
                                <textarea
                                    placeholder="Write task content here..."
                                    className={
                                        errors?.content
                                            ? "form__input textarea error-input"
                                            : "form__input textarea"
                                    }
                                    autoComplete="off"
                                    {...register("content", {
                                        required: "cannot be empty",
                                    })}
                                ></textarea>
                            </div>

                            <div className="error__message">
                                {errors?.content && (
                                    <p className="error__message_text">
                                        {errors?.content?.message}
                                    </p>
                                )}
                            </div>

                            <p className="modalWindow__text-description second">
                                Priority
                            </p>

                            {changePriority ? (
                                <ul>
                                    <PriorityButtons
                                        setChangePriority={setChangePriority}
                                    />
                                </ul>
                            ) : (
                                <div className="modalWindow__button">
                                    <button
                                        className={`block__button ${
                                            priorityArray[priority - 1].color
                                        } big mr1`}
                                        onClick={() => setChangePriority(true)}
                                    >
                                        <div className="block__button-description">
                                            {priorityArray[priority - 1].description}
                                        </div>
                                    </button>
                                </div>
                            )}

                            <div className="block__line block__line-form"></div>
                            <button
                                type="submit"
                                disabled={changePriority || queryLoading}
                                className="block__button submit big mb"
                            >
                                Add
                            </button>
                            {isAuth && errorInfo && (
                                <div className="error_info taskmodal">{errorInfo}</div>
                            )}
                        </form>
                    </div>

                    <div className="close" onClick={() => closeTaskWindow()}>
                        <div className="close__button"></div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default TaskModalWindow
