import React from "react"
import { useSearchParams } from "react-router-dom"
import HelmetComponent from "../components/Helmet/HelmetComponent"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { confirmEmail } from "../Store/reducers/authorization/slice"
import { selectAuthorization } from "../Store/selectors"

const ConfirmEmail = () => {
    const dispatch = useAppDispatch()
    const { confirmInfo } = useAppSelector(selectAuthorization)
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get("token")

    React.useEffect(() => {
        if (token) {
            dispatch(confirmEmail(token))
        }
    }, [])

    if(!confirmInfo) {
        return <div></div>
    }

    return (
        <>
            <HelmetComponent title={"ConfirmEmail"} content={"ConfirmEmail"} />
            <div>hello</div>
        </>
    )
}

export default ConfirmEmail
