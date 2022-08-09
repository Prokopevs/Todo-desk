import React from "react"
import DashBoard from "./pages/DashBoard"
import LoginForm from "./pages/LoginForm"
import { Routes, Route, Navigate } from "react-router-dom"
import RegisterForm from "./pages/RegisterForm"
import Errors from "./pages/Errors"
import { useAppSelector, useAppDispatch } from "./hooks/redux"
import { checkAuth, setAuth, setLoading } from "./Store/reducers/authorizationSlice";
import Demo from "./pages/Demo";
import Home from "./pages/Home";
import { useSessionStorage } from "./hooks/useSessionStorage";

export const ModalWindowContext = React.createContext(null);

const App = () => {
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector(state => state.authorizationSlice)

    const [modalTaskActive, setModalTaskActive] = useSessionStorage("TaskModal", false);
    const [modalStatusActive, setStatusActive] = useSessionStorage("StatusModal", false);
    
    const rememberMe = localStorage.getItem("rememberMe")
    const token = localStorage.getItem("token")
    const checkReboot = sessionStorage.getItem("checkReboot")

    React.useEffect(() => {
        if (rememberMe === "false" && token && !checkReboot) {
            localStorage.removeItem("token")
        }
        if (localStorage.getItem("token")) {
            dispatch(checkAuth())
        } else {
            dispatch(setAuth(false))
            dispatch(setLoading(false))
        }
    }, [])

    if (isLoading) {
        return <div></div>
    }

    if (!isLoading) {
        return (
            <div className={modalTaskActive || modalStatusActive ? "container modal-open" : "container"}>
                <ModalWindowContext.Provider value={{modalTaskActive, setModalTaskActive, modalStatusActive, setStatusActive}}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/dashboard" element={<DashBoard />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="errors" element={<Errors />} />
                </Routes>
                </ModalWindowContext.Provider>
            </div>
        );
    }
    return <></>
}

export default App
