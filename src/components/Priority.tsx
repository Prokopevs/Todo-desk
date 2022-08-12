import React from "react"
import { useAppDispatch } from "../hooks/redux"
import { IPriorityProps } from "../models/IPriorityProps"
import { onChangePriority, setOpenPriorityСolumn } from "../Store/reducers/dndSlice"

const Priority: React.FC<IPriorityProps> = ({ priorityArray, task }) => {
    const dispatch = useAppDispatch()

    const onChange = (id: string, index: number) => {
        const obj = {
            id: id,
            index: index,
        }
        dispatch(onChangePriority(obj))
        dispatch(setOpenPriorityСolumn(id))
    }

    return (
        <>
            <div className="block__line block__line-task"></div>
            <ul className="block__priority">
                <li
                    className={`block__button task ${priorityArray[task.priority].color}`}
                    onClick={() => dispatch(setOpenPriorityСolumn(task.id))}
                >
                    <p className="block__button_text">
                        {priorityArray[task.priority].description}
                    </p>
                </li>
                {priorityArray
                    .filter((item) => item.index != task.priority)
                    .map((item, index) => (
                        <li
                            className={`block__button task ${item.color}`}
                            key={index}
                            onClick={() => onChange(task.id, item.index)}
                        >
                            <p className="block__button_text">{item.description}</p>
                        </li>
                    ))}
            </ul>
        </>
    )
}

export default Priority
