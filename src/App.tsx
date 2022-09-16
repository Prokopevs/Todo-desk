import React from "react"
import { useAppSelector, useAppDispatch } from "./hooks/redux"
import { checkAuth, setAuth, setLoading } from "./Store/reducers/authorization/slice"
import { useSessionStorage } from "./hooks/useSessionStorage"
import AppRouter from "./components/Router/AppRouter"

const App = () => {
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector((state) => state.authorizationSlice)

    const [modalTA, setMTA] = useSessionStorage("TaskModal", false)
    const [modalSA, setMSA] = useSessionStorage("StatusModal", false)

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
            <div className={modalTA || modalSA ? "container modal-open" : "container"}>
                <AppRouter
                    modalTA={modalTA}
                    setMTA={setMTA}
                    modalSA={modalSA}
                    setMSA={setMSA}
                />
            </div>
        )
    }
    return <></>
}

export default App
