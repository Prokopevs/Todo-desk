import React from "react"
import { CSSTransition } from "react-transition-group"
import { ModalWindowContext } from "../App"
import { useAppSelector } from "../hooks/redux"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { selectAuthorization, selectDnd } from "../Store/selectors"

const SelectModal = ({ changesActive }) => {
    const { isAuth } = useAppSelector(selectAuthorization)
    const { setModalTaskActive, setStatusActive } = React.useContext(ModalWindowContext)
    const { data } = useAppSelector(selectDnd)
    const columnsLength = Object.keys(data.columns).length
    const { width } = useWindowDimensions()

    const selectPage = isAuth ? "selectChanges" : "selectChanges demo"
    const selectPageAbsolute = isAuth ? "selectChanges-absolute" : "selectChanges-absolute demo"

    return (
        <CSSTransition
            in={changesActive}
            timeout={200}
            classNames="my-node"
            unmountOnExit
        >
            <div className={data.columnOrder.length > 3 || width! < 768 ? selectPage : selectPageAbsolute}>
                {columnsLength !== 0 && <p className="selectChanges_task" onClick={() => setModalTaskActive(true)}>
                    Task
                </p>}
                <p className="selectChanges_status" onClick={() => setStatusActive(true)}>
                    Status
                </p>
            </div>
        </CSSTransition>
    )
}

export default SelectModal
