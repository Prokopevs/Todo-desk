import React from 'react'

const RegisterForm = () => {
    return (
        <div className="form position-absolute top-50 start-50 translate-middle">
            <div className="form__container">
                <p className="register__form_name text-center">Register</p>
                <div className="block__line block__line-form"></div>

                <p className="login__form_data_name">Email</p>
                <div className="form__input_holder">
                    <input placeholder="Your email..." type="email" className="form__input"></input>
                </div>
                <p className="login__form_data_name">Name</p>
                <div className="form__input_holder">
                    <input placeholder="Your display name..." type="text" className="form__input"></input>
                </div>
                <p className="login__form_data_name">Password</p>
                <div className="form__input_holder">
                    <input placeholder="Your account password..." type="text" className="form__input"></input>
                </div>

                <button className="button__big button__big-green button__big-green-mr button__big-green-register">Login</button>
            </div>
        </div>
    )
}

export default RegisterForm
