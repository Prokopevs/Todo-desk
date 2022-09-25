import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { registration } from "../Store/reducers/authorization/slice"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { AuthRedirect } from "../helpers/AuthRedirect"
import { deleteErrorInfo } from "../Store/reducers/errorMessage/slice"
import { selectAuthorization, selectEditMode, selectError } from "../Store/selectors"
import Eye from "../components/Eye"
import HelmetComponent from "../components/Helmet/HelmetComponent"

type Inputs = {
    name: string
    email: string
    password: string
}

const RegisterForm: React.FC = () => {
    const [registerClick, setRegisterClick] = React.useState<boolean>(false)
    const { isAuth } = useAppSelector(selectAuthorization)
    const { errorInfo } = useAppSelector(selectError)
    const dispatch = useAppDispatch()
    const { queryLoading } = useAppSelector(selectEditMode)

    const [click, setClick] = React.useState(false)

    React.useEffect(() => {
        document.title = "Register"
        return () => {
            dispatch(deleteErrorInfo())
        }
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onBlur" })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(deleteErrorInfo())
        dispatch(registration(data))
        setRegisterClick(true)
    }

    AuthRedirect(registerClick, setRegisterClick)

    if (isAuth === false) {
        return (
            <>
                <HelmetComponent title={"Register"} content={"RegisterFrom"} />
                <div className="form position-absolute top-50 start-50 translate-middle">
                    <div className="form__container">
                        <p className="register__form_name text-center">Register</p>
                        <div className="block__line block__line-form"></div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p className="login__form_data_name">Email</p>
                            <div
                                className={
                                    errors?.email
                                        ? "form__input_holder error-holder"
                                        : "form__input_holder"
                                }
                            >
                                <input
                                    placeholder="Your email..."
                                    type="email"
                                    className={
                                        errors?.email
                                            ? "form__input error-input"
                                            : "form__input"
                                    }
                                    autoComplete="off"
                                    {...register("email", {
                                        required: "cannot be empty",
                                    })}
                                ></input>
                            </div>
                            <div className="error__message">
                                {errors?.email && (
                                    <p className="error__message_text">
                                        {errors?.email?.message}
                                    </p>
                                )}
                            </div>

                            <p className="login__form_data_name">Name</p>
                            <div
                                className={
                                    errors?.name
                                        ? "form__input_holder error-holder"
                                        : "form__input_holder"
                                }
                            >
                                <input
                                    placeholder="Your display name..."
                                    type="text"
                                    className={
                                        errors?.name
                                            ? "form__input error-input"
                                            : "form__input"
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

                            <p className="login__form_data_name">Password</p>
                            <div
                                className={
                                    errors?.password
                                        ? "form__input_holder error-holder"
                                        : "form__input_holder"
                                }
                            >
                                <input
                                    placeholder="Your account password..."
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
                                <Eye setClick={setClick} click={click} />
                            </div>
                            <div className="error__message">
                                {errors?.password && (
                                    <p className="error__message_text">
                                        {errors?.password?.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="block__button submit big mr2"
                                disabled={queryLoading}
                            >
                                Register
                            </button>
                            {errorInfo && (
                                <div className="error_info register">{errorInfo}</div>
                            )}
                        </form>
                    </div>
                </div>
            </>
        )
    }
    return <></>
}

export default RegisterForm
