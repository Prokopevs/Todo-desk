import React from "react"
import { registration } from "../Store/reducers/authorizationSlice"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { AuthRedirect } from "../helpers/AuthRedirect"

const RegisterForm = ({ registerClick, setRegisterClick }) => {
    const [email, setEmail] = React.useState<string>("")
    const [name, setName] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const isAuth = useAppSelector((state) => state.authorizationSlice.isAuth)

    const dispatch = useAppDispatch()

    const onClickRegister = (email, name, password) => {
        dispatch(registration(email, name, password))
        setRegisterClick(true)
    }

    AuthRedirect(registerClick, setRegisterClick)

    if (isAuth === false) {
        return (
            <div className="form position-absolute top-50 start-50 translate-middle">
                <div className="form__container">
                    <p className="register__form_name text-center">Register</p>
                    <div className="block__line block__line-form"></div>

                    <p className="login__form_data_name">Email</p>
                    <div className="form__input_holder">
                        <input
                            placeholder="Your email..."
                            type="email"
                            className="form__input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <p className="login__form_data_name">Name</p>
                    <div className="form__input_holder">
                        <input
                            placeholder="Your display name..."
                            type="text"
                            className="form__input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <p className="login__form_data_name">Password</p>
                    <div className="form__input_holder">
                        <input
                            placeholder="Your account password..."
                            type="text"
                            className="form__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>

                    <button
                        className="button__big button__big-green button__big-green-mr button__big-green-register"
                        onClick={() => onClickRegister(email, name, password)}
                    >
                        Register
                    </button>
                </div>
            </div>
        )
    }
    return <></>
}

export default RegisterForm
