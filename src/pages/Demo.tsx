import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Desk from "../components/Desk"
import StatusModalWindow from "../components/ModalWindows/StatusModalWindow"
import TaskModalWindow from "../components/ModalWindows/TaskModalWindow"
import { useAppSelector } from "../hooks/redux"

const Demo = () => {
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (isAuth) {
            navigate("/dashboard")
        }
    }, [isAuth])

    if (!isAuth) {
        return (
            <div>
                <div className="demo">
                    <div className="static">Demo mode</div>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                    <button className="block__button submit big demo">
                            Login
                        </button>
                    </Link>
                </div>
                <Desk />
                <TaskModalWindow/>
                <StatusModalWindow />
            </div>
        )
    }
    return <></>
}

export default Demo