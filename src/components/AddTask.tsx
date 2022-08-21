import React from "react"
import { useAppSelector } from "../hooks/redux"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { IAddTaskProps } from "../models/IAddTaskProps"

type addTaskClick = MouseEvent & {
    path: Node[]
}

const AddTask: React.FC<IAddTaskProps> = ({ changesActive, setChangesActive }) => {
    const { isAuth } = useAppSelector((state) => state.authorizationSlice)
    const { data } = useAppSelector((state) => state.dndSlice)
    const { width } = useWindowDimensions()

    const columLength = data.columnOrder.length
    const addTaskRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as addTaskClick

            if (addTaskRef.current && !_event.path.includes(addTaskRef.current)) {
                setChangesActive(false)
            }
        }

        document.body.addEventListener("click", handleClickOutside)

        return () => document.body.removeEventListener("click", handleClickOutside)
    }, [])

    return (
        <div
            ref={addTaskRef}
            className={
                columLength > 3 || width! < 768
                    ? isAuth
                        ? "addTask"
                        : "addTask demo"
                    : isAuth
                    ? "addTask-absolute"
                    : "addTask-absolute demo"
            }
            onClick={() => setChangesActive(!changesActive)}
        >
            <div
                className={changesActive ? "addTask__plus change" : "addTask__plus"}
            ></div>
        </div>
    )
}

export default AddTask
