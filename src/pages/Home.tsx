import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"

const Home = () => {
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (isAuth) {
            navigate("/dashboard")
        }
        if (isAuth === false) {
            navigate("/static")
        }
    }, [isAuth])

    return <div></div>
}

export default Home
