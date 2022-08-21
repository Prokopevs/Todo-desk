import React from "react"
import { login, corgi } from "../pictures"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { setAuth, setUser } from "../Store/reducers/authorizationSlice"
import { IUser } from "../models/IUser"
import { useNavigate } from "react-router-dom"
import { setInitialData } from "../Store/reducers/dndSlice"
import { useSelector } from "react-redux"

const Logout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { name } = useAppSelector(state => state.authorizationSlice.user)

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("rememberMe")
        dispatch(setAuth(false))
        dispatch(setUser({} as IUser))
        dispatch(setInitialData())
        navigate("/")
    }

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <div className="login">
                    <div className="login__user_img">
                        <p className="login__user_leter">{name[0].toUpperCase()}</p>
                    </div>
                    <img
                        className="login__icon"
                        src={String(login)}
                        alt=""
                        onClick={() => logout()}
                    ></img>
                </div>
            </div>
        </div>
    )
}

export default Logout
