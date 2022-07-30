import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Desk from '../components/Desk'
import ModalWindow from '../components/ModalWindow'
import { useAppSelector } from '../hooks/redux'

const Static = () => {
    const [modalActive, setModalActive] = React.useState(false)
    const { isAuth } = useAppSelector(state => state.authorizationSlice)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (isAuth) {
            navigate('/dashboard')
        }
    }, [isAuth])

    if (isAuth === false) {
        return (
            <div>
                <Link to="/login">
                    <button type="button" className="btn btn-primary">Login</button>
                </Link>
                <h1 className="static">Static</h1>
                <Desk active={modalActive} setActive={setModalActive} />
                <ModalWindow active={modalActive} setActive={setModalActive} />
            </div>
        )
    }
}

export default Static