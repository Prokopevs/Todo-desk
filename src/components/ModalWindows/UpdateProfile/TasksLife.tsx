import React from "react"
import { ITasksLife } from "../../../models/Task/ITasksLife"
import { down, up } from "../../../pictures"

const TasksLife: React.FC<ITasksLife> = ({ timeLife, setTimeLife }) => {
    const dayArray = [1, 2, 3, 5, 10, 30, 90, 180, 365]
    const formatter = new Intl.NumberFormat("eng", {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
    })
    const [day, setDay] = React.useState(1)

    const handleClick = (item: number) => {
        setDay(item)
        setTimeLife(false)
    }

    return (
        <div className="tasksLife__text">
            Done task’s time to live
            <div className={timeLife ? "tasksLife__inner array" : "tasksLife__inner"}>
                <div className="tasksLife__inner_width none"></div>

                {!timeLife ? (
                    <div className="tasksLife__inner_information">
                        <p className="tasksLife__inner_text">{formatter.format(day)}</p>
                    </div>
                ) : (
                    <div className="tasksLife__inner_information array">
                        {dayArray.map((item) => (
                            <p className="tasksLife__inner_text array" onClick={() => handleClick(item)}>{formatter.format(item)}</p>
                        ))}
                    </div>
                )}

                <div
                    className={
                        timeLife
                            ? "tasksLife__inner_width array"
                            : "tasksLife__inner_width"
                    }
                    onClick={() => setTimeLife(!timeLife)}
                >
                    <img
                        className="tasksLife__inner_img"
                        src={timeLife ? String(up) : String(down)}
                        alt=""
                    ></img>
                </div>
            </div>
        </div>
    )
}

export default TasksLife
