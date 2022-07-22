import React from "react"
import { NeuToggle } from "neumorphism-react"
import { Link } from "react-router-dom"

const LoginForm = () => {
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
                    ></input>
                </div>
                <p className="login__form_data_name">Password</p>
                <div className="form__input_holder">
                    <input
                        placeholder="Your account password..."
                        type="password"
                        className="form__input"
                    ></input>
                </div>

                <div className="login__form_remember">
                    <NeuToggle
                        size="small"
                        onChange={(value) => console.log("new toggle value : ", value)}
                    />
                    <p className="login__form_remember_text">Remember me</p>
                </div>

                <button className="button__big button__big-green button__big-green-mr">
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

export default LoginForm
