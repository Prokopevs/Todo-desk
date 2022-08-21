import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { registration } from "../Store/reducers/authorizationSlice"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { AuthRedirect } from "../helpers/AuthRedirect"
import { IRegisterForm } from "../models/IRegisterForm"
import { deleteErrorInfo } from "../Store/reducers/errorMessageSlice"

type Inputs = {
    name: string
    email: string
    password: string
}

const RegisterForm = () => {
    const [registerClick, setRegisterClick] = React.useState<boolean>(false)
    const isAuth = useAppSelector(state => state.authorizationSlice.isAuth)
    const { errorInfo } = useAppSelector(state => state.errorMessageSlice)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        return() => {
            dispatch(deleteErrorInfo())
        }
    }, [])

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<Inputs>({ mode: "onBlur" })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(deleteErrorInfo())
        dispatch(registration(data))
        setRegisterClick(true)
        reset()
    }

    AuthRedirect(registerClick, setRegisterClick)

    if (isAuth === false) {
        return (
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
                                {...register("email", { required: "cannot be empty" })}
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
                                type="text"
                                className={
                                    errors?.password
                                        ? "form__input error-input"
                                        : "form__input"
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
                        </div>
                        <div className="error__message">
                            {errors?.password && (
                                <p className="error__message_text">
                                    {errors?.password?.message}
                                </p>
                            )}
                        </div>

                        <button type="submit" className="block__button submit big mr2">
                            Register
                        </button>
                        {errorInfo && <div className="error_info register">{errorInfo}</div>}
                    </form>
                </div>
            </div>
        )
    }
    return <></>
}

export default RegisterForm
