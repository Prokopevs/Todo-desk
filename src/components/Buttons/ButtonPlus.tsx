import React from "react"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { plus } from "../../pictures"
import { setParentId } from "../../Store/reducers/dndSlice"
import { selectDnd, selectEditMode } from "../../Store/selectors"

const ButtonPlus = ({ position, column, setMSA }) => {
    const dispatch = useAppDispatch()
    const { data } = useAppSelector(selectDnd)
    const { selectedStatus } = useAppSelector(selectEditMode)
    const columnOrder = data.columnOrder

    const handleAddStatus = () => {
        if (column.id === columnOrder[0] && position === "left") {
            dispatch(setParentId(0))
        } else {
            if (position === "left") {
                const NewIndex = columnOrder.indexOf(column.id) - 1
                dispatch(setParentId(columnOrder[NewIndex]))
            } else {
                dispatch(setParentId(column.id))
            }
        }
        setMSA(true)
    }

    return (
        <div
            className={column.id === selectedStatus ? "button__visible" : "button__none"}
        >
            <button
                className={`block__plus ${position}`}
                onClick={() => handleAddStatus()}
            >
                <img className="block__plus-img" src={String(plus)}></img>
            </button>
        </div>
    )
}

export default ButtonPlus
