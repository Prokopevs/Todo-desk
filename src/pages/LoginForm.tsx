import React from "react"
import { NeuToggle } from "neumorphism-react"
import { Link, useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { login } from "../Store/reducers/authorizationSlice"
import { AuthRedirect } from "../helpers/AuthRedirect"

const LoginForm = ({ loginClick, setloginClick }) => {
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector((state) => state.authorizationSlice.isAuth)

    const onClickLogin = (email, password) => {
        dispatch(login(email, password))
        setloginClick(true)
    }

    AuthRedirect(loginClick, setloginClick)

    if (isAuth === false) {
        return (
            <div className="form position-absolute top-50 start-50 translate-middle">
                <div className="form__container">
                    <p className="login__form_name text-center">Login</p>
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
                    <p className="login__form_data_name">Password</p>
                    <div className="form__input_holder">
                        <input
                            placeholder="Your account password..."
                            type="password"
                            className="form__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>

                    <div className="login__form_remember">
                        <NeuToggle
                            size="small"
                            onChange={(value) =>
                                console.log("new toggle value : ", value)
                            }
                        />
                        <p className="login__form_remember_text">Remember me</p>
                    </div>

                    <button
                        className="button__big button__big-green button__big-green-mr"
                        onClick={() => onClickLogin(email, password)}
                    >
                        Login
                    </button>

                    <p className="login__form_new">New user?</p>
                    <p className="login__form_new login__form_new-mb">
                        You can create you account{" "}
                        <Link to="/register" className="login__form_register">
                            now
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
    return <></>
}

export default LoginForm
