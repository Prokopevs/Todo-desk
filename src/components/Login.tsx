import React from 'react'
import { login, logout, corgi } from '../pictures'

const Login = () => {
    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <div className="login">
                    <img className="login__user_img" src={String(corgi)} alt=""></img>
                    <img className="login__icon" src={String(login)} alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default Login