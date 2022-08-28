import React from "react"
import { IEye } from "../models/Generally/IEye"
import { eye, eyeO } from "../pictures"

const Eye: React.FC<IEye> = ({setClick, click}) => {
    return (
        <img
            className="password-control" 
            onClick={() => setClick(!click)}
            src={click ? String(eye) : String(eyeO)}
        ></img>
    )
}

export default Eye
