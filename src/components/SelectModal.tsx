import React from "react"
import { CSSTransition } from "react-transition-group"
import { ModalWindowContext } from "../App"
import { useAppSelector } from "../hooks/redux"

const SelectModal = ({ changesActive }) => {
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const { setModalTaskActive, setStatusActive } = React.useContext(ModalWindowContext)

    return (
        <CSSTransition
            in={changesActive}
            timeout={200}
            classNames="my-node"
            unmountOnExit
        >
            <div className={isAuth ? "selectChanges" : "selectChanges demo"}>
                <p
                    className="selectChanges_task"
                    onClick={() => setModalTaskActive(true)}
                >
                    Task
                </p>
                <p className="selectChanges_status" onClick={() => setStatusActive(true)}>
                    Status
                </p>
            </div>
        </CSSTransition>
    )
}

export default SelectModal
