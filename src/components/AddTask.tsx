import React from "react"
import { ModalWindowContext } from "../App"
import { useAppSelector } from "../hooks/redux"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { selectDnd, selectAuthorization } from "../Store/selectors"

const AddTask = () => {
    const { isAuth } = useAppSelector(selectAuthorization)
    const { data } = useAppSelector(selectDnd)
    const { width } = useWindowDimensions()
    const columLength = data.columnOrder.length
    const { setModalTaskActive } = React.useContext(ModalWindowContext)
    
    const selectPage = isAuth ? "addTask" : "addTask demo"
    const selectPageAbsolute = isAuth ? "addTask-absolute" : "addTask-absolute demo"

    const handleClick = () => {
        setModalTaskActive(true)
    }

    return (
        <div
            className={columLength > 3 || width! < 768 ?  selectPage : selectPageAbsolute}
            onClick={() => handleClick()}
        >
            <div className="addTask__plus"></div>
        </div>
    )
}

export default AddTask
