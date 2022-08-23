import React from "react"
import { useNavigate } from "react-router-dom"
import Desk from "../components/Desk"
import Logout from "../components/Logout"
import StatusModalWindow from "../components/ModalWindows/StatusModalWindow"
import TaskModalWindow from "../components/ModalWindows/TaskModalWindow"
import { useAppSelector } from "../hooks/redux"
import { Helmet } from "react-helmet"
import { selectAuthorization } from "../Store/selectors"

const DashBoard = () => {
    localStorage.removeItem("modal")
    const { isAuth } = useAppSelector(selectAuthorization)
    const { globalErrorMessage } = useAppSelector((state) => state.errorMessageSlice)
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
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Task Tracker</title>
                    <meta name="Task Tracker" content="DashBoard" />
                </Helmet>
                <Logout />
                <Desk />
                <TaskModalWindow />
                <StatusModalWindow />
            </div>
        )
    }
    return <></>
}

export default DashBoard
