import React from "react"
import { cross2, vector } from "../../pictures"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import {
    changeStatusName,
    changeStatusNameQuery,
    setQueryFlag,
} from "../../Store/reducers/dnd/slice"
import { selectAuthorization, selectDnd, selectEditMode, selectError } from "../../Store/selectors"
import { deleteErrorStatusName } from "../../Store/reducers/errorMessage/slice"
import { deleteItemInEditStatus } from "../../Store/reducers/editMode/slice"

type Inputs = {
    id: string
    name: string
}

const EditStatus = ({ column, setChangeName }) => {
    const dispatch = useAppDispatch()
    const { editStatus } = useAppSelector(selectEditMode)
    const { isAuth } = useAppSelector(selectAuthorization)
    const { errorInfoStatusName } = useAppSelector(selectError)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onBlur" })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(deleteErrorStatusName(column.id))
        data["id"] = column.id
        if (isAuth) {
            dispatch(changeStatusNameQuery(data))
        } else {
            dispatch(changeStatusName(data))
            stopEditMode()
        }
    }

    React.useEffect(() => {
        if (editStatus.includes(column.id)) {
            stopEditMode()
            dispatch(deleteItemInEditStatus(column.id))
        }
    }, [editStatus])

    const stopEditMode = () => {
        dispatch(deleteErrorStatusName(column.id))
        setChangeName(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block__status_edit">
                <div className="edit__inner">
                    <button
                        className="edit__inner_btn red"
                        onClick={() => stopEditMode()}
                        type="button"
                    >
                        <img className="edit__photo" src={String(cross2)}></img>
                    </button>

                    <input
                        className="edit__inner_input"
                        autoComplete="off"
                        defaultValue={column.name}
                        autoFocus
                        {...register("name", { required: "cannot be empty" })}
                    ></input>

                    <button type="submit" className="edit__inner_btn">
                        <img className="edit__photo" src={String(vector)}></img>
                    </button>
                </div>
                <div className="error__message">
                    {errors?.name && (
                        <p className="error__message_text mt">{errors?.name?.message}</p>
                    )}
                    {isAuth && errorInfoStatusName[column.id]?.message && (
                    <div className="error__message_text mt">{errorInfoStatusName[column.id]?.message}</div>
                    )}
                </div>
            </div>
        </form>
    )
}

export default EditStatus
