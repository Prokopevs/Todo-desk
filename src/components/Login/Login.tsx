import React from 'react'
import s from './Login.module.css'
import { login, logout, corgi } from '../../pictures'

const Login = () => {
    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <div className={s.login}>
                    <img className={s.login__user_img} src={String(corgi)} alt=""></img>
                    <img className={s.login__icon} src={String(login)} alt=""></img>
                </div>
            </div>
            {/* <div>hello</div> */}
        </div>
        
    )
}

export default Login