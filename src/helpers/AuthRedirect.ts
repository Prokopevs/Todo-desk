import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"

export let AuthRedirect = (click, setClick) => {
    const isAuth = useAppSelector(state => state.authorizationSlice.isAuth)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (click && isAuth) {
            navigate('/dashboard')
            setClick(false)
        }
        if (!click && isAuth) {
            navigate('/dashboard')
        }
    }, [isAuth])

}
