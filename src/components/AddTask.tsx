import React from "react"

import { useAppSelector } from "../hooks/redux"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { IModalTask } from "../models/EditMode/IStorage"
import { selectAuthorization, selectDnd } from "../Store/selectors"

const AddTask: React.FC<IModalTask> = ({ setMTA }) => {
    const { isAuth } = useAppSelector(selectAuthorization)
    const { data } = useAppSelector(selectDnd)
    const { width } = useWindowDimensions()
    const columLength = data.columnOrder.length

    const selectPage = isAuth ? "addTask" : "addTask demo"
    const selectPageAbsolute = isAuth ? "addTask-absolute" : "addTask-absolute demo"

    const handleClick = () => {
        setMTA(true)
    }

    return (
        <div
            className={columLength > 3 || width! < 768 ? selectPage : selectPageAbsolute}
            onClick={() => handleClick()}
        >
            <div className="addTask__plus"></div>
        </div>
    )
}

export default AddTask
