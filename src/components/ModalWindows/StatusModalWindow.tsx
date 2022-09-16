import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"

import { addStatus, addStatusQuery, setQueryFlag } from "../../Store/reducers/dnd/slice"
import { deleteErrorInfo } from "../../Store/reducers/errorMessage/slice"
import { selectDnd, selectError, selectEditMode, selectAuthorization } from "../../Store/selectors"
import { IModalStatus } from "../../models/EditMode/IStorage";

type Inputs = {
    name: string
    isAuth: boolean
    parentId: number
}

const StatusModalWindow: React.FC<IModalStatus> = ({ modalSA, setMSA }) => {
    const dispatch = useAppDispatch()
    const { data, queryFlag, parentId } = useAppSelector(selectDnd)
    const { isAuth } = useAppSelector(selectAuthorization)
    const { errorInfo } = useAppSelector(selectError)
    const { queryLoading } = useAppSelector(selectEditMode)

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
        data["parentId"] = parentId
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
        setMSA(false)
        setTimeout(() => reset(), 200);
    }

    return (
        <CSSTransition
            in={modalSA}
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
                                        ? "form__input_holder error-holder margin-form"
                                        : "form__input_holder margin-form"
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
                                    <p className="error__message_text margin-top">
                                        {errors?.name?.message}
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
