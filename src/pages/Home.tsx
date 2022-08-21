import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"

const Home = () => {
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const { globalErrorMessage } = useAppSelector(state => state.errorMessageSlice)

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
