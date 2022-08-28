import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { NeuToggle } from "neumorphism-react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { login, setRememberMe } from "../Store/reducers/authorizationSlice"
import { AuthRedirect } from "../helpers/AuthRedirect"
import { deleteErrorInfo } from "../Store/reducers/errorMessageSlice"
import { selectError, selectAuthorization } from "../Store/selectors"
import HelmetComponent from "../components/HelmetComponent"
import Eye from "../components/Eye"


type Inputs = {
    password: string
    email: string
    rememberMe: boolean
}

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const { isAuth, rememberMe } = useAppSelector(selectAuthorization)
    const { errorInfo } = useAppSelector(selectError)
    const [loginClick, setloginClick] = React.useState<boolean>(false)

    const [click, setClick] = React.useState(false)

    React.useEffect(() => {
        return () => {
            dispatch(deleteErrorInfo())
        }
    }, [])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onBlur" })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(deleteErrorInfo())
        data["rememberMe"] = rememberMe
        dispatch(login(data))
        setloginClick(true)
        reset()
    }

    AuthRedirect(loginClick, setloginClick)

    if (isAuth === false) {
        return (
            <>
                <HelmetComponent title={"Login"} content={"LoginFrom"} />
                <div className="form position-absolute top-50 start-50 translate-middle">
                    <div className="form__container">
                        <p className="login__form_name text-center">Login</p>
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
                                    {...register("password", {
                                        required: "cannot be empty",
                                    })}
                                ></input>
                                <Eye setClick={setClick} click={click}/>
                            </div>

                            <div className="error__message">
                                {errors?.password && (
                                    <p className="error__message_text">
                                        {errors?.password?.message}
                                    </p>
                                )}
                            </div>

                            <div className="login__form_remember">
                                <NeuToggle
                                    size="small"
                                    onChange={(value) => dispatch(setRememberMe(value))}
                                />
                                <p className="login__form_remember_text">Remember me</p>
                            </div>

                            <button
                                type="submit"
                                className="block__button submit big login"
                            >
                                Login
                            </button>
                            {errorInfo && <div className="error_info">{errorInfo}</div>}
                        </form>
                        <p className="login__form_new">New user?</p>
                        <p className="login__form_new login__form_new-mb">
                            You can create you account{" "}
                            <Link
                                to="/register"
                                onClick={() => dispatch(deleteErrorInfo())}
                                className="login__form_register"
                            >
                                now
                            </Link>
                        </p>
                    </div>
                </div>
            </>
        )
    }
    return <></>
}

export default LoginForm
