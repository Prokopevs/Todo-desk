import React from "react"
import { cross2, vector } from "../../pictures"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { changeStatusNameQuery, setQueryFlag } from "../../Store/reducers/dndSlice"
import { selectAuthorization, selectDnd, selectEditMode, selectError } from "../../Store/selectors"
import { deleteErrorInfo, deleteErrorInfoStatus } from "../../Store/reducers/errorMessageSlice"

type Inputs = {
    id: string
    name: string
}

const EdditStatus = ({ column, setchangeName }) => {
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
        dispatch(changeStatusNameQuery(data))
    }

    React.useEffect(() => {
        if(queryFlag) {
            stopEditMode()
            dispatch(setQueryFlag(false))
        }
    }, [queryFlag])

    const stopEditMode = () => {
        dispatch(deleteErrorInfoStatus())
        setchangeName(false)
    }

    return (
        <div className="block__status_eddit">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="eddit__inner">
                    
                        <button
                            className="eddit__inner_btn red"
                            onClick={() => stopEditMode()}
                        >
                            <img className="eddit__photo" src={String(cross2)}></img>
                        </button>
                    
                        <input
                            className="eddit__inner_input"
                            placeholder="Write status name"
                            autoComplete="off"
                            defaultValue={column.name}
                            autoFocus
                            {...register("name", { required: "cannot be empty" })}
                        ></input>
                    
                        <button type="submit" className="eddit__inner_btn">
                            <img className="eddit__photo" src={String(vector)}></img>
                        </button>
                    
                </div>
                <div className="error__message">
                    {errors?.name && (
                        <p className="error__message_text mt">{errors?.name?.message}</p>
                    )}
                    {isAuth && errorInfoStatusName && <div className="error__message_text mt">{errorInfoStatusName}</div>}   
                </div>
            </form>
        </div>
    )
}

export default EdditStatus
