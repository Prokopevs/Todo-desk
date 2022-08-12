import React from "react"
import { useAppDispatch } from "../../hooks/redux"
import { ITasksPrioritySelect } from "../../models/ITasksContent"
import { setOpenPriorityСolumn } from "../../Store/reducers/dndSlice"
import Priority from "../Priority"

const TaskPriority: React.FC<ITasksPrioritySelect> = ({ task, editMode, priorityArray }) => {
    const dispatch = useAppDispatch()

    return (
        <>
            {editMode && (
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
                                        priorityArray[task.priority].color
                                    }`}
                                    onClick={() =>
                                        dispatch(setOpenPriorityСolumn(task.id))
                                    }
                                >
                                    <p className="block__button_text">
                                        {priorityArray[task.priority].description}
                                    </p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default TaskPriority
