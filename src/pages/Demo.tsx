import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Desk from "../components/Desk"
import StatusModalWindow from "../components/ModalWindows/StatusModalWindow"
import TaskModalWindow from "../components/ModalWindows/TaskModalWindow"
import { useAppSelector } from "../hooks/redux"
import { Helmet } from "react-helmet"
import { selectAuthorization } from "../Store/selectors"

const Demo = () => {
    const { isAuth } = useAppSelector(selectAuthorization)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (isAuth) {
            navigate("/dashboard")
        }
    }, [isAuth])

    if (!isAuth) {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Task Tracker</title>
                    <meta name="Task Tracker" content="Demo Mode" />
                </Helmet>
                <div className="demo">
                    <div className="static">Demo mode</div>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <button className="block__button submit big demo">Login</button>
                    </Link>
                </div>
                <Desk />
                <TaskModalWindow />
                <StatusModalWindow />
            </div>
        )
    }
    return <></>
}

export default Demo
