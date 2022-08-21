import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"

import { ModalWindowContext } from "../../App";
import { addStatus, addStatusQuery, setQueryFlag } from "../../Store/reducers/dndSlice";
import { deleteErrorInfo } from "../../Store/reducers/errorMessageSlice";

type Inputs = {
    name: string
    priority: string
    isAuth: boolean
}

const StatusModalWindow = () => {
    const dispatch = useAppDispatch()
    const { modalStatusActive, setStatusActive } = React.useContext(ModalWindowContext)
    const { data, queryFlag } = useAppSelector((state) => state.dndSlice)
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const { errorInfo } = useAppSelector(state => state.errorMessageSlice)
    const queryLoading = useAppSelector((state) => state.editModeSlice.queryLoading)

    const columnOrderLength = data.columnOrder.length
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onBlur" })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(deleteErrorInfo())
        data["isAuth"] = isAuth!
        if(isAuth) {
            dispatch(addStatusQuery(data))
        } else {
            dispatch(addStatus(data))
            closeStatusWindow()
        }
    }

    React.useEffect(() => {
        if(queryFlag) {
            closeStatusWindow()
            dispatch(setQueryFlag(false))
        }
    }, [queryFlag])

    const closeStatusWindow = () => {
        dispatch(deleteErrorInfo())
        setStatusActive(false)
        setTimeout(() => reset(), 200);
    }

    return (
        <CSSTransition
            in={modalStatusActive}
            timeout={150}
            classNames="my-node"
            unmountOnExit
        >
            <div className="modalWindow">
                <div className="modalWindow_content">
                    <div className="form_container form_container-modalWindow">
                        <p className="modalWindow__text text-center">Add status</p>
                        <div className="block__line block__line-form"></div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p className="modalWindow__text-description">Name</p>
                            <div
                                className={
                                    errors?.name
                                        ? "form__input_holder error-holder"
                                        : "form__input_holder"
                                }
                            >
                                <input
                                    placeholder="Write status name here..."
                                    className={
                                        errors?.name
                                            ? "form__input status error-input"
                                            : "form__input status"
                                    }
                                    autoComplete="off"
                                    {...register("name", { required: "cannot be empty" })}
                                ></input>
                            </div>
                            <div className="error__message">
                                {errors?.name && (
                                    <p className="error__message_text">
                                        {errors?.name?.message}
                                    </p>
                                )}
                            </div>

                            <p className="modalWindow__text-description">Priority</p>
                            <div
                                className={
                                    errors?.priority
                                        ? "form__input_holder error-holder margin-form"
                                        : "form__input_holder margin-form"
                                }
                            >
                                <input
                                    placeholder={`Write status priority from 0 to ${columnOrderLength}`}
                                    className={
                                        errors?.priority
                                            ? "form__input status error-input"
                                            : "form__input status"
                                    }
                                    autoComplete="off"
                                    {...register("priority", {
                                        required: "cannot be empty",
                                        min: {
                                            value: 0,
                                            message: "cannot be less than 0",
                                        },
                                        max: {
                                            value: columnOrderLength,
                                            message: `cannot be more than ${columnOrderLength}`,
                                        },
                                        validate: {
                                            number: (value) =>
                                                /[0-9]/.test(value) || "must be a number",
                                        },
                                    })}
                                ></input>
                            </div>
                            <div className="error__message">
                                {errors?.priority && (
                                    <p className="error__message_text top">
                                        {errors?.priority?.message}
                                    </p>
                                )}
                            </div>

                            <div className="block__line block__line-form"></div>

                            <button type="submit" disabled={queryLoading} className="block__button submit big mb status-type">
                                Add
                            </button>
                            {isAuth && errorInfo && <div className="error_info taskmodal">{errorInfo}</div>}   
                        </form>
                    </div>

                    <div className="close" onClick={() => closeStatusWindow()}>
                        <div className="close__button"></div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default StatusModalWindow
