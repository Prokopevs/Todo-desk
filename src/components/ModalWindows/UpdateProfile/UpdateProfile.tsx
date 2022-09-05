import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { IProfile } from "../../../models/Generally/IProfile"
import { setSettingsQuery } from "../../../Store/reducers/authorizationSlice"
import { addStatus, addStatusQuery, setQueryFlag } from "../../../Store/reducers/dndSlice"
import { deleteErrorInfo } from "../../../Store/reducers/errorMessageSlice"
import {
    selectDnd,
    selectError,
    selectAuthorization,
    selectEditMode,
} from "../../../Store/selectors"
import Eye from "../../Eye"
import SelectButtons from "./SelectButtons"
import TasksLife from "./TasksLife"

type Inputs = {
    email: string
    name: string
    password: string
    taskTTL: number
    emailConfirmed: boolean
}

const UpdateProfile: React.FC<IProfile> = ({ modalProfileActive, setProfileActive }) => {
    const dispatch = useAppDispatch()
    const { queryFlag } = useAppSelector(selectDnd)
    const { user } = useAppSelector(selectAuthorization)
    const [click, setClick] = React.useState(false)
    const [timeLife, setTimeLife] = React.useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onSubmit" })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(deleteErrorInfo())
        data["taskTTL"] = user.taskTTL
        data["emailConfirmed"] = true
        dispatch(setSettingsQuery(data))
        closeStatusWindow()
    }

    React.useEffect(() => {
        if (queryFlag) {
            closeStatusWindow()
            dispatch(setQueryFlag(false))
        }
    }, [queryFlag])

    const closeStatusWindow = () => {
        dispatch(deleteErrorInfo())
        setProfileActive(false)
        setTimeout(() => reset(), 200)
    }

    return (
        <CSSTransition
            in={modalProfileActive}
            timeout={150}
            classNames="my-node"
            unmountOnExit
        >
            <div className="modalWindow">
                <div className="modalWindow_content">
                    <div className="form_container form_container-modalWindow">
                        <p className="modalWindow__text text-center profile settings">
                            Update profile
                        </p>
                        <div className="block__line block__line-form settings"></div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p className="modalWindow__text-description settings">Email</p>
                            <div
                                className={
                                    errors?.email
                                        ? "form__input_holder error-holder settings"
                                        : "form__input_holder settings"
                                }
                            >
                                <input
                                    placeholder="Write your email here..."
                                    className={
                                        errors?.email
                                            ? "form__input status error-input"
                                            : "form__input status"
                                    }
                                    autoComplete="off"
                                    {...register("email", { required: "cannot be empty" })}
                                ></input>
                            </div>
                            <div className="error__message settings">
                                {errors?.email && (
                                    <p className="error__message_text settings">
                                        {errors?.email?.message}
                                    </p>
                                )}
                            </div>

                            <p className="modalWindow__text-description settings">Name</p>
                            <div
                                className={
                                    errors?.name
                                        ? "form__input_holder error-holder settings"
                                        : "form__input_holder settings"
                                }
                            >
                                <input
                                    placeholder="Set a new user name"
                                    className={
                                        errors?.name
                                            ? "form__input status error-input"
                                            : "form__input status"
                                    }
                                    autoComplete="off"
                                    {...register("name", { required: "cannot be empty" })}
                                ></input>
                            </div>
                            <div className="error__message settings">
                                {errors?.name && (
                                    <p className="error__message_text settings">
                                        {errors?.name?.message}
                                    </p>
                                )}
                            </div>

                            <p className="modalWindow__text-description settings">Password</p>
                            <div
                                className={
                                    errors?.password
                                        ? "form__input_holder error-holder settings"
                                        : "form__input_holder settings"
                                }
                            >
                                <input
                                    placeholder="Set a new password"
                                    type={click ? "" : "password"}
                                    className={
                                        errors?.password
                                            ? "form__input error-input password"
                                            : "form__input password"
                                    }
                                    autoComplete="off"
                                    {...register("password", {
                                        required: "cannot be empty",
                                        minLength: {
                                            value: 8,
                                            message: "must be at least 8 characters",
                                        },
                                    })}
                                ></input>
                                <Eye setClick={setClick} click={click}/>
                            </div>
                            <div className="error__message settings">
                                {errors?.password && (
                                    <p className="error__message_text settings">
                                        {errors?.password?.message}
                                    </p>
                                )}
                            </div>

                            <TasksLife timeLife={timeLife} setTimeLife={setTimeLife}/>
                            {!timeLife && <SelectButtons closeStatusWindow={closeStatusWindow}/>}

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

export default UpdateProfile
