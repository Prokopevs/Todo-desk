import React from "react"

const Priority = ({ priorityArray, id, onChangePriority }) => {
    return (
        <>
            <div className="block__line"></div>
            <ul className="block__priority">
                {priorityArray.map((item, index) => (
                    <li
                        className={`block__button ${item.color}`}
                        key={index}
                        onClick={() => onChangePriority(id, index)}
                    >
                        <p className="block__button_text">{item.description}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Priority
