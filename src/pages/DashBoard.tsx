import React from "react"
import { useNavigate } from "react-router-dom"
import Desk from "../components/Desk"
import Login from "../components/Login"
import ModalWindow from "../components/ModalWindow"
import { useAppSelector } from "../hooks/redux"

const DashBoard = () => {
    const [modalActive, setModalActive] = React.useState(false)
    const { isAuth } = useAppSelector(state => state.authorizationSlice)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (isAuth === false) {
            navigate('/static')
        }
    }, [isAuth])

    if(isAuth) {
        return (
            <div>
                <Login />
                <Desk active={modalActive} setActive={setModalActive} />
                <ModalWindow active={modalActive} setActive={setModalActive} />
            </div>
        )
    }
}

export default DashBoard
