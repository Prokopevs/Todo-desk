import React from 'react'
import { NeuToggle } from 'neumorphism-react';

const LoginForm = () => {
    return (
        <div className="login__form position-absolute top-50 start-50 translate-middle">
            <div className="login__form_container">
                <p className="login__form_name text-center">Login</p>
                <div className="block__line block__line-form"></div>

                <p className="login__form_data_name">Email</p>
                <div className="login__firm_input_holder">
                    <input placeholder="Your email..." type="email" className="login__form_input"></input>
                </div>
                <p className="login__form_data_name">Password</p>
                <div className="login__firm_input_holder">
                    <input placeholder="Your account password..." type="password" className="login__form_input"></input>
                </div>

                <div className="login__form_remember">
                    <NeuToggle size="small" onChange={(value) => console.log("new toggle value : ", value)} />
                    <p className="login__form_remember_text">Remember me</p>
                </div>

                <p className="login__form_new">New user?</p>
                <p className="login__form_new">You can create you account now</p>
            </div>

        </div>
    )
}

export default LoginForm
