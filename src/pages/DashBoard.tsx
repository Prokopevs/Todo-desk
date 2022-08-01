import React from "react"
import { useNavigate } from "react-router-dom"
import Desk from "../components/Desk"
import Login from "../components/Login"
import ModalWindow from "../components/ModalWindow"
import { useAppSelector } from "../hooks/redux"
import { useSessionStorage } from "../hooks/useSessionStorage"

const DashBoard = () => {
    const [modalActive, setModalActive] = useSessionStorage("modalDashBoard", false)
    localStorage.removeItem("modal")
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const navigate = useNavigate()

    // React.useEffect(() => {
    //     if (isAuth === false) {
    //         navigate('/static')
    //     }
    // }, [isAuth])

    // isAuth
    if (true) {
        return (
            <div>
                <Login />
                <Desk active={modalActive} setActive={setModalActive} />
                <ModalWindow active={modalActive} setActive={setModalActive} />
            </div>
        )
    }
    return <></>
}

export default DashBoard
