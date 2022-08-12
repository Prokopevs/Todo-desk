import React from "react"
import priorityArray from "../data/Desk/priorityArray"
import { useAppDispatch } from "../hooks/redux"
import { setPriority } from "../Store/reducers/prioritySlice"

const PriorityButtons = ({ setChangePrioprity }) => {
    const dispatch = useAppDispatch()

    const changePrioprity = (index: number) => {
        dispatch(setPriority(index))
        setChangePrioprity(false)
    }

    return (
        <>
            {priorityArray.map((item, index) => (
                <li className="modalWindow__priority" key={index}>
                    <button
                        className={`block__button ${item.color} big mr1`}
                        onClick={() => changePrioprity(index)}
                    >
                        {item.description}
                    </button>
                </li>
            ))}
        </>
    )
}

export default PriorityButtons
