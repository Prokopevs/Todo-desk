import React from "react"
import { useNavigate } from "react-router-dom"
import Desk from "../components/Desk"
import HelmetComponent from "../components/Helmet/HelmetComponent"
import Settings from "../components/Settings"
import StatusModalWindow from "../components/ModalWindows/StatusModalWindow"
import TaskModalWindow from "../components/ModalWindows/TaskModalWindow"
import { useAppSelector } from "../hooks/redux"
import { selectAuthorization, selectError } from "../Store/selectors"

const DashBoard = () => {
    localStorage.removeItem("modal")
    const { isAuth } = useAppSelector(selectAuthorization)
    const { globalErrorMessage } = useAppSelector(selectError)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (isAuth === false) {
            navigate("/demo")
        }
    }, [isAuth])

    React.useEffect(() => {
        if (globalErrorMessage) {
            navigate("/errors")
        }
    }, [])

    if (globalErrorMessage) {
        return <></>
    }

    if (isAuth) {
        return (
            <div>
                <HelmetComponent title={"Task Tracker"} content={"DashBoard"} />
                <Settings />
                <Desk />
                <TaskModalWindow />
                <StatusModalWindow />
            </div>
        )
    }
    return <></>
}

export default DashBoard
