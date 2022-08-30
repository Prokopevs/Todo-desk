import React from "react"
import { useNavigate } from "react-router-dom"
import HelmetComponent from "../components/Helmet/HelmetComponent"
import { useAppSelector } from "../hooks/redux"
import { selectError } from "../Store/selectors"

const Errors = () => {
    const { globalErrorMessage } = useAppSelector(selectError)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!globalErrorMessage) {
            navigate("/")
        }
    }, [])

    return (
        <>
            <HelmetComponent title={"Errors"} content={"Errors Text"} />
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
