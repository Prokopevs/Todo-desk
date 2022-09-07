import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { deleteStatus, deleteStatusQuery } from '../../Store/reducers/dndSlice'
import { deleteErrorStatusInfo } from '../../Store/reducers/errorMessageSlice'
import { selectAuthorization, selectError } from '../../Store/selectors'

const ButtonMinus = ({ column, hover }) => {
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector(selectAuthorization)

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
    <div className={hover ? "block__visible" : "block__collapse"}>
    <button
        className="block__minus"
        onClick={() => handleDelete()}
     >
    <div className="block__minus-line"></div>
    </button>  
    </div>
  )
}

export default ButtonMinus