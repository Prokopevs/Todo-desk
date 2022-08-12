import React from "react"
import { ModalWindowContext } from "../App"
import { useAppSelector } from "../hooks/redux"
import { IAddTaskProps } from "../models/IAddTaskProps"

type PopupClick = MouseEvent & {
    path: Node[]
}

const AddTask: React.FC<IAddTaskProps> = ({ changesActive, setChangesActive }) => {
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const { data } = useAppSelector((state) => state.dndSlice)
    const columLength = data.columnOrder.length
    const sortRef = React.useRef()
    const { modalTaskActive, modalStatusActive } = React.useContext(ModalWindowContext)

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as PopupClick

            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setChangesActive(false)
            }
        }

        document.body.addEventListener("click", handleClickOutside)

        return () => document.body.removeEventListener("click", handleClickOutside)
    }, [])

    return (
            <div ref={sortRef} className={columLength > 3 ? isAuth ? "addTask" : "addTask demo" : isAuth ? "addTask-absolute" : "addTask-absolute demo"} onClick={() => setChangesActive(!changesActive)}>
                <div
                    className={changesActive ? "addTask__plus change" : "addTask__plus"}
                ></div>
            </div>
    )
}

export default AddTask
