import React from "react"
import { useAppSelector, useAppDispatch } from "./hooks/redux"
import { checkAuth, setAuth, setLoading } from "./Store/reducers/authorizationSlice"
import { useSessionStorage } from "./hooks/useSessionStorage"
import AppRouter from "./components/Router/AppRouter"

export const ModalWindowContext = React.createContext(null) as any

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
                    <AppRouter />
                </ModalWindowContext.Provider>
            </div>
        )
    }
    return <></>
}

export default App
