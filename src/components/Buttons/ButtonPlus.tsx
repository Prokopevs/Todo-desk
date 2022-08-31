import React from "react"
import { ModalWindowContext } from "../../App"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setParentId } from "../../Store/reducers/dndSlice"
import { selectDnd } from "../../Store/selectors"

const ButtonPlus = ({ position, hover, column }) => {
    const dispatch = useAppDispatch()
    const { setStatusActive } = React.useContext(ModalWindowContext)
    const { data } = useAppSelector(selectDnd)
    const columnOrder = data.columnOrder

    const handleAddStatus = () => {
        if(column.id === columnOrder[0] && position === "left") {
            dispatch(setParentId(0))
        } else {
            if(position === "left") {
                const NewIndex = columnOrder.indexOf(column.id) - 1
                dispatch(setParentId(columnOrder[NewIndex]))
            } else {
                dispatch(setParentId(column.id))
            }
        }
        setStatusActive(true)
    }

    return (
        <div className={hover ? "block__visible" : "block__collapse"}>
            <button
                className={`block__plus ${position}`}
                onClick={() => handleAddStatus()}
            >
                <div className="block__plus-line"></div>
            </button>
        </div>
    )
}

export default ButtonPlus
