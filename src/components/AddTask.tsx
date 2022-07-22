import React from "react"
import { IDesk } from "../models/IDesk"

const AddTask: React.FC<IDesk> = ({ active, setActive }) => {
    return (
        <div className="addTask" onClick={() => setActive(true)}>
            <div className="addTask__plus"></div>
        </div>
    )
}

export default AddTask
