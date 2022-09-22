import React from "react"
import { IModalStatus } from "../models/EditMode/IStorage"

const Button: React.FC<IModalStatus> = ({ setMSA }) => {
    return (
        <>
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="5"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            type="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="highContrastGraphic"
                        />
                        <feComposite
                            in="SourceGraphic"
                            in2="highContrastGraphic"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>

            <button id="gooey-button">
                Click me
                <span className="bubbles" onClick={() => setMSA(true)}>
                    <span className="bubble"></span>
                    <span className="bubble"></span>
                    <span className="bubble"></span>
                    <span className="bubble"></span>
                    <span className="bubble"></span>
                    <span className="bubble"></span>
                    <span className="bubble"></span>
                    <span className="bubble"></span>
                    <span className="bubble"></span>
                    <span className="bubble"></span>
                </span>
            </button>
        </>
    )
}

export default Button
