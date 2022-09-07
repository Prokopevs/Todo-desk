import React from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { deleteStatus, deleteStatusQuery } from "../../Store/reducers/dndSlice"
import { selectAuthorization, selectEditMode } from "../../Store/selectors"

const ButtonMinus = ({ column }) => {
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector(selectAuthorization)
    const { selectedStatus } = useAppSelector(selectEditMode)

    const handleDelete = () => {
        const obj = {
            column: column,
            isAuth: isAuth,
        }
        isAuth ? dispatch(deleteStatusQuery(obj)) : dispatch(deleteStatus(obj))
    }

    return (
        <div className={column.id === selectedStatus ? "button__visible" : "button__none"}>
            <button className="block__minus" onClick={() => handleDelete()}>
                <div className="block__minus-line"></div>
            </button>
        </div>
    )
}

export default ButtonMinus
