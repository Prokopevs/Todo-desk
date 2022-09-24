import React from "react"
import { logoutImg, settings } from "../pictures"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { setAuth, setUser } from "../Store/reducers/authorization/slice"
import { useNavigate } from "react-router-dom"
import { setInitialData } from "../Store/reducers/dnd/slice"
import { useSessionStorage } from "../hooks/useSessionStorage"
import UpdateProfile from "./ModalWindows/UpdateProfile/UpdateProfile"
import { IUser } from "../Store/reducers/authorization/types"

const Settings = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { name } = useAppSelector((state) => state.authorizationSlice.user)
    const [modalProfileActive, setProfileActive] = useSessionStorage(
        "ProfileModal",
        false
    )
    const [active, setActive] = React.useState(true)

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("rememberMe")
        dispatch(setAuth(false))
        dispatch(setUser({} as IUser))
        dispatch(setInitialData())
        navigate("/")
    }

    const handleMouseOver = () => {
        setActive(false)
    }

    const handleMouseOut = () => {
        setActive(true)
    }

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <div className="login">
                    <div
                        className="login__user_img"
                        onMouseOver={() => {
                            handleMouseOver()
                        }}
                        onMouseOut={() => {
                            handleMouseOut()
                        }}
                        onClick={() => logout()}
                    >
                        <p className="login__user_letter">
                            {active ? (
                                name && name[0]?.toUpperCase()
                            ) : (
                                <img className="logout-img" src={String(logoutImg)}></img>
                            )}
                        </p>
                    </div>
                    <img
                        className="login__icon"
                        src={String(settings)}
                        alt=""
                        onClick={() => setProfileActive(true)}
                        role="button"
                    ></img>
                </div>
                <UpdateProfile
                    modalProfileActive={modalProfileActive}
                    setProfileActive={setProfileActive}
                />
            </div>
        </div>
    )
}

export default Settings
