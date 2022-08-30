import React from "react"
import { down } from "../../../pictures"

const TasksLife = () => {
    return (
        <div className="tasksLife__text">
            Done task’s time to live
            <div className="tasksLife__inner">
                <div className="tasksLife__inner_width none"></div>

                <div className="tasksLife__inner_information">
                    <p className="tasksLife__inner_text">1 Day</p>
                </div>

                <div className="tasksLife__inner_width">
                    <img className="tasksLife__inner_img" src={String(down)} alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default TasksLife
