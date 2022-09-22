import React from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { IButtonMinus } from "../../models/Status/IButton"
import { minus } from "../../pictures"
import { deleteStatus, deleteStatusQuery } from "../../Store/reducers/dnd/slice"
import { deleteErrorStatusInfo } from "../../Store/reducers/errorMessage/slice"
import { selectAuthorization, selectEditMode } from "../../Store/selectors"

const ButtonMinus: React.FC<IButtonMinus> = ({ column }) => {
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector(selectAuthorization)
    const { selectedStatus } = useAppSelector(selectEditMode)

    const handleDelete = () => {
        const obj = {
            column: column,
            isAuth: isAuth,
        }
        isAuth ? dispatch(deleteStatusQuery(obj)) : dispatch(deleteStatus(obj))

        setTimeout(() => {
            dispatch(deleteErrorStatusInfo(column.id))
        }, 7000)
    }

    return (
        <div
            className={column.id === selectedStatus ? "button__visible" : "button__none"}
        >
            <button className="block__minus" onClick={() => handleDelete()}>
                <img className="block__minus-img" src={String(minus)}></img>
            </button>
        </div>
    )
}

export default ButtonMinus
