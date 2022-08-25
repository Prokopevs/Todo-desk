import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"
import { selectAuthorization, selectError } from "../Store/selectors"

const Home = () => {
    const { isAuth } = useAppSelector(selectAuthorization)
    const { globalErrorMessage } = useAppSelector(selectError)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (globalErrorMessage) {
            navigate("/errors")
        }
    }, [])

    React.useEffect(() => {
        if (isAuth && !globalErrorMessage) {
            navigate("/dashboard")
        }
        if (!isAuth) {
            navigate("/demo")
        }
    }, [isAuth])

    return <></>
}

export default Home
