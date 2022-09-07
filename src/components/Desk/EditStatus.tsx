import React from "react"
import { cross2, vector } from "../../pictures"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import {
    changeStatusName,
    changeStatusNameQuery,
    setQueryFlag,
} from "../../Store/reducers/dndSlice"
import { selectAuthorization, selectDnd, selectError } from "../../Store/selectors"
import { deleteErrorInfoStatus } from "../../Store/reducers/errorMessageSlice"

type Inputs = {
    id: string
    name: string
}

const EditStatus = ({ column, setChangeName }) => {
    const dispatch = useAppDispatch()
    const { queryFlag } = useAppSelector(selectDnd)
    const { isAuth } = useAppSelector(selectAuthorization)
    const { errorInfoStatusName } = useAppSelector(selectError)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onBlur" })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(deleteErrorInfoStatus())
        data["id"] = column.id
        if (isAuth) {
            dispatch(changeStatusNameQuery(data))
        } else {
            dispatch(changeStatusName(data))
            stopEditMode()
        }
    }

    React.useEffect(() => {
        if (queryFlag) {
            stopEditMode()
            dispatch(setQueryFlag(false))
        }
    }, [queryFlag])

    const stopEditMode = () => {
        dispatch(deleteErrorInfoStatus())
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
                    {isAuth && errorInfoStatusName && (
                        <div className="error__message_text mt">
                            {errorInfoStatusName}
                        </div>
                    )}
                </div>
            </div>
        </form>
    )
}

export default EditStatus
