import React from "react"
import priorityArray from "../data/Desk/priorityArray"
import { useAppDispatch } from "../hooks/redux"
import { IPriorityButtons } from "../models/EditMode/IPriorityButtons"
import { setPriority } from "../Store/reducers/priority/slice"

const PriorityButtons: React.FC<IPriorityButtons> = ({ setChangePriority }) => {
    const dispatch = useAppDispatch()

    const changePriority = (index: number) => {
        dispatch(setPriority(index))
        setChangePriority(false)
    }

    return (
        <>
            <div role="priority"></div>
            {priorityArray.map((item, index) => (
                <li className="modalWindow__priority" key={index}>
                    <button
                        className={`block__button ${item.color} big mr1`}
                        onClick={() => changePriority(item.index)}
                    >
                        {item.description}
                    </button>
                </li>
            ))}
        </>
    )
}

export default PriorityButtons
