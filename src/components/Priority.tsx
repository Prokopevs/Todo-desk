import React from 'react'

const Priority = () => {
    return (
        <>
            <div className="block__line"></div>
            <ul className="block__priority">
                <li className="block__button block__button-purple">
                    <p className="block__button_text">Very High</p>
                </li>
                <li className="block__button block__button-red">
                    <p className="block__button_text">High</p>
                </li>
                <li className="block__button block__button-green">
                    <p className="block__button_text">Normal</p>
                </li>
                <li className="block__button block__button-blue">
                    <p className="block__button_text">Low</p>
                </li>
                <li className="block__button block__button-lightblue">
                    <p className="block__button_text">Very Low</p>
                </li>
            </ul>
        </>
    )
}

export default Priority