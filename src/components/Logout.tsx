import React from "react"
import { login, settings } from "../pictures"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { setAuth, setUser } from "../Store/reducers/authorizationSlice"
import { IUser } from "../models/Auth/IUser"
import { useNavigate } from "react-router-dom"
import { setInitialData } from "../Store/reducers/dndSlice"
import { selectAuthorization } from "../Store/selectors"
import { useSessionStorage } from "../hooks/useSessionStorage"
import UpdateProfile from "./ModalWindows/UpdateProfile"

const Logout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { name } = useAppSelector(state => state.authorizationSlice.user)
    const [modalProfileActive, setProfileActive] = useSessionStorage("ProfileModal", false);

    // const logout = () => {
    //     localStorage.removeItem("token")
    //     localStorage.removeItem("rememberMe")
    //     dispatch(setAuth(false))
    //     dispatch(setUser({} as IUser))
    //     dispatch(setInitialData())
    //     navigate("/")
    // }

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <div className="login">
                    <div className="login__user_img">
                        <p className="login__user_letter" >{name && name[0]?.toUpperCase()}</p>
                    </div>
                    <img
                        className="login__icon"
                        src={String(settings)}
                        alt=""
                        // onClick={() => logout()}
                        onClick={() => setProfileActive(true)}
                        role="button"
                    ></img>
                </div>
                <UpdateProfile modalProfileActive={modalProfileActive} setProfileActive={setProfileActive}/>
            </div>
        </div>
    )
}

export default Logout
