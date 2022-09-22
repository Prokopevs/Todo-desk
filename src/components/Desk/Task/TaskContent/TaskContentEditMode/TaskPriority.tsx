import React from "react"
import priorityArray from "../../../../../data/Desk/priorityArray"
import { useAppDispatch } from "../../../../../hooks/redux"
import { ITasksContentEditMode } from "../../../../../models/Task/ITasksContent"
import { setOpenPriorityСolumn } from "../../../../../Store/reducers/dnd/slice"
import Priority from "./Priority"

const TaskPriority: React.FC<ITasksContentEditMode> = ({ task }) => {
    const dispatch = useAppDispatch()

    return (
        <div>
            {task.isOpen ? (
                <ul>
                    <Priority priorityArray={priorityArray} task={task} />
                </ul>
            ) : (
                <div>
                    <div className="block__line block__line-task"></div>
                    <div className="modalWindow__button task">
                        <button
                            className={`block__button task ${
                                priorityArray[task.priority - 1]?.color
                            }`}
                            data-testid="toggle-btn"
                            onClick={() => dispatch(setOpenPriorityСolumn(task.id))}
                        >
                            <p className="block__button_text">
                                {priorityArray[task.priority - 1]?.description}
                            </p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskPriority
