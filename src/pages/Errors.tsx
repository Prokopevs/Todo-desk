import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"
import { Helmet } from "react-helmet"

const Errors = () => {
    const { globalErrorMessage } = useAppSelector((state) => state.errorMessageSlice)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!globalErrorMessage) {
            navigate("/")
        }
    }, [])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Errors</title>
                <meta name="Errors" content="Errors Text" />
            </Helmet>
            <div className="error">
                <p className="error__text">{globalErrorMessage.substring(0, 3)}</p>
                <p className="error__text_decription">
                    {globalErrorMessage.substring(3, globalErrorMessage.length)}
                </p>
            </div>
        </>
    )
}

export default Errors
