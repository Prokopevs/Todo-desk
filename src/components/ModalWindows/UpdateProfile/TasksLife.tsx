import React from "react"
import { ITasksLife } from "../../../models/Task/ITasksLife"
import { down, up } from "../../../pictures"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { setTTL } from "../../../Store/reducers/authorization/slice"
import { selectAuthorization } from "../../../Store/selectors"

const TasksLife: React.FC<ITasksLife> = ({ timeLife, setTimeLife }) => {
    const dispatch = useAppDispatch()
    const { user, TTLArray } = useAppSelector(selectAuthorization)

    const dayArray = TTLArray ? TTLArray : [1, 2, 3, 5, 10, 30, 90, 180, 365]
    const formatter = new Intl.NumberFormat("eng", {
        style: "unit",
        unit: "day",
        unitDisplay: "long",
    })

    const handleClick = (item: number) => {
        dispatch(setTTL(item))
        setTimeLife(false)
    }

    return (
        <div className="tasksLife__text">
            Done task’s time to live
            <div className={timeLife ? "tasksLife__inner array" : "tasksLife__inner"}>
                <div className="tasksLife__inner_width none"></div>

                {!timeLife ? (
                    <div
                        className="tasksLife__inner_information"
                        onClick={() => setTimeLife(!timeLife)}
                    >
                        <p className="tasksLife__inner_text">
                            {formatter.format(user.taskTTL)}
                        </p>
                    </div>
                ) : (
                    <div className="tasksLife__inner_information array">
                        {dayArray.map((item, index) => (
                            <p
                                key={index}
                                className="tasksLife__inner_text array"
                                onClick={() => handleClick(item)}
                            >
                                {formatter.format(item)}
                            </p>
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
