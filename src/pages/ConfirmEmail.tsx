import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import HelmetComponent from "../components/Helmet/HelmetComponent"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { confirmEmail, setConfirmLoading } from "../Store/reducers/authorization/slice"
import { deleteErrorInfo } from "../Store/reducers/errorMessage/slice"
import { selectAuthorization, selectError } from "../Store/selectors"

const ConfirmEmail = () => {
    const dispatch = useAppDispatch()
    const { errorInfo } = useAppSelector(selectError)
    const { confirmLoading } = useAppSelector(selectAuthorization)
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get("token")

    React.useEffect(() => {
        if (token) {
            dispatch(confirmEmail(token))
        }
        return () => {
            dispatch(deleteErrorInfo())
            dispatch(setConfirmLoading(true))
        }
    }, [])

    if (!confirmLoading) {
        return (
            <div className="confirm__email">
                <HelmetComponent title={"ConfirmEmail"} content={"ConfirmEmail"} />
                {errorInfo ? (
                    <div className="confirm__email_text">
                        Your email address has already been verified or something went
                        wrong. Click <Link to="/">here</Link> to continue working.
                    </div>
                ) : (
                    <div className="confirm__email_text">
                        You have successfully verified your email. Click
                        <Link to="/">here</Link> to continue working.
                    </div>
                )}
            </div>
        )
    }

    return <div></div>
}

export default ConfirmEmail
