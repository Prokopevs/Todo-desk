import React from "react"
import { Route, Routes } from "react-router-dom"
import { IStorage } from "../../models/EditMode/IStorage"
import DashBoard from "../../pages/DashBoard"
import Demo from "../../pages/Demo"
import Errors from "../../pages/Errors"
import Home from "../../pages/Home"
import LoginForm from "../../pages/LoginForm"
import RegisterForm from "../../pages/RegisterForm"

const AppRouter: React.FC<IStorage> = ({ modalTA, setMTA, modalSA, setMSA }) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/demo"
                    element={
                        <Demo
                            modalTA={modalTA}
                            setMTA={setMTA}
                            modalSA={modalSA}
                            setMSA={setMSA}
                        />
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <DashBoard
                            modalTA={modalTA}
                            setMTA={setMTA}
                            modalSA={modalSA}
                            setMSA={setMSA}
                        />
                    }
                />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="errors" element={<Errors />} />
            </Routes>
        </>
    )
}

export default AppRouter
