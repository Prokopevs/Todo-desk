import React from "react"
import { useAppDispatch } from "../hooks/redux"
import { IPriorityProps } from "../models/IPriorityProps"
import { onChangePriority} from "../Store/reducers/dndSlice"
import { setPriority } from "../Store/reducers/prioritySlice"

const Priority: React.FC<IPriorityProps> = ({ priorityArray, id, setChangePrioprity }) => {
    const dispatch = useAppDispatch()

    const onChange = (id: string, index: number) => {
        const obj = {
            id: id,
            index: index,
        }
        dispatch(onChangePriority(obj))
        // dispatch(setOpenPriorityСolumn(id))
        dispatch(setPriority(index))
        setChangePrioprity(false)
    }

    return (
        <>
            <div className="block__line block__line-task"></div>
            <ul className="block__priority">
                {priorityArray.map((item, index) => (
                    <li
                        className={`block__button ${item.color}`}
                        key={index}
                        onClick={() => onChange(id, index)}
                    >
                        <p className="block__button_text">{item.description}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Priority
