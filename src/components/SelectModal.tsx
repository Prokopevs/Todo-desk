import React from "react"
import { CSSTransition } from "react-transition-group"
import { ModalWindowContext } from "../App"
import { useAppSelector } from "../hooks/redux"
import useWindowDimensions from "../hooks/useWindowDimensions"

const SelectModal = ({ changesActive }) => {
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const { setModalTaskActive, setStatusActive } = React.useContext(ModalWindowContext)
    const { data } = useAppSelector((state) => state.dndSlice)
    const columLength = data.columnOrder.length
    const { width } = useWindowDimensions()

    return (
        <CSSTransition
            in={changesActive}
            timeout={200}
            classNames="my-node"
            unmountOnExit
        >
            <div
                className={
                    columLength > 3 || width! < 768
                        ? isAuth
                            ? "selectChanges"
                            : "selectChanges demo"
                        : isAuth
                        ? "selectChanges-absolute"
                        : "selectChanges-absolute demo"
                }
            >
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
