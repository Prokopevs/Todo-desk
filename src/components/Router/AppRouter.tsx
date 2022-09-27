import React, { Suspense } from "react"
import { Route, Routes, useSearchParams } from "react-router-dom"
import { IStorage } from "../../models/EditMode/IStorage"
import DashBoard from "../../pages/DashBoard"
import Demo from "../../pages/Demo"
import Home from "../../pages/Home"

const Errors = React.lazy(() => import("../../pages/Errors"))
const LoginForm = React.lazy(() => import("../../pages/LoginForm"))
const RegisterForm = React.lazy(() => import("../../pages/RegisterForm"))
const ConfirmEmail = React.lazy(() => import("../../pages/ConfirmEmail"))

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
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<div></div>}>
                            <LoginForm />
                        </Suspense>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Suspense fallback={<div></div>}>
                            <RegisterForm />
                        </Suspense>
                    }
                />
                <Route
                    path="/errors"
                    element={
                        <Suspense fallback={<div></div>}>
                            <Errors />
                        </Suspense>
                    }
                />
                <Route
                    path="/confirm_email"
                    element={
                        <Suspense fallback={<div></div>}>
                            <ConfirmEmail />
                        </Suspense>
                    }
                />
            </Routes>
        </>
    )
}

export default AppRouter
