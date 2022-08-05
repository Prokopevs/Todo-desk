import React from "react"
import DashBoard from "./pages/DashBoard"
import LoginForm from "./pages/LoginForm"
import { Routes, Route, Navigate } from "react-router-dom"
import RegisterForm from "./pages/RegisterForm"
import Errors from "./pages/Errors"
import { useAppSelector, useAppDispatch } from "./hooks/redux"
import { checkAuth, setAuth } from "./Store/reducers/authorizationSlice"
import Static from "./pages/Static"
import Home from "./pages/Home"

const App = () => {
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector((state) => state.authorizationSlice)
    const [loginClick, setloginClick] = React.useState<boolean>(false)
    const [registerClick, setRegisterClick] = React.useState<boolean>(false)

    const rememberMe = localStorage.getItem("rememberMe")
    const token = localStorage.getItem("token")
    const checkReboot = sessionStorage.getItem("checkReboot") // при перезагрузке в sessionStorage есть значение, из за этого токен не удаляется. Но если мы закроем вкладку sessionStorage умрет и при следующем входе код в if сможет выполниться

    React.useEffect(() => {
        if (rememberMe === "false" && token && !checkReboot) {
            localStorage.removeItem("token")
        }
        if (localStorage.getItem("token")) {
            dispatch(checkAuth())
        } else {
            dispatch(setAuth(false))
        }
    }, [])

    if (isLoading) {
        return <div></div>
    }

    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/static" element={<Static />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route
                    path="/login"
                    element={
                        <LoginForm
                            loginClick={loginClick}
                            setloginClick={setloginClick}
                        />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <RegisterForm
                            registerClick={registerClick}
                            setRegisterClick={setRegisterClick}
                        />
                    }
                />
                <Route path="errors" element={<Errors />} />
            </Routes>
        </div>
    )
}

export default App
