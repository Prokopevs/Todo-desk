import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { deleteStatus, deleteStatusQuery } from '../../Store/reducers/dndSlice'
import { selectAuthorization } from '../../Store/selectors'

const ButtonMinus = ({ column, hover }) => {
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector(selectAuthorization)

    const handleDelete = () => {
        const obj = {
            column: column,
            isAuth: isAuth,
        }
        isAuth ? dispatch(deleteStatusQuery(obj)) : dispatch(deleteStatus(obj))
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