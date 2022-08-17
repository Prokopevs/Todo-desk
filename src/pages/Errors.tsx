import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"

const Errors = () => {
    const { globalErrorMessage } = useAppSelector(state => state.errorMessageSlice)
    const navigate = useNavigate()

    React.useEffect(() =>{
        if(!globalErrorMessage) {
            navigate("/")
        }
    }, [])
    
    return (
        <div className="error">
            <p className="error__text">{globalErrorMessage.substring(0,3)}</p>
            <p className="error__text_decription">{globalErrorMessage.substring(3,globalErrorMessage.length)}</p>
        </div>
    )
}

export default Errors