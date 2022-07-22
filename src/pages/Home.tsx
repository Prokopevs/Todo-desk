import React from "react"
import Desk from "../components/Desk"
import Login from "../components/Login"
import ModalWindow from "../components/ModalWindow"

const Home = () => {
    const [modalActive, setModalActive] = React.useState(false)
    return (
        <div>
            <Login />
            <Desk active={modalActive} setActive={setModalActive} />
            <ModalWindow active={modalActive} setActive={setModalActive} />
        </div>
    )
}

export default Home
