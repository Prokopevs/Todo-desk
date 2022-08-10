import React from "react"
import Priority from "../Priority"
import { Draggable } from "react-beautiful-dnd"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { deleteTask } from "../../Store/reducers/dndSlice"
import { ITasksProps } from "../../models/ITasksProps"
import TasksContent from "./TasksContent"
import { pen } from "../../pictures"

const Tasks: React.FC<ITasksProps> = React.memo(
    ({ task, index, priorityArray, column }) => {
        const { isValid } = useAppSelector((state) => state.contentSlice)
        const dispatch = useAppDispatch()
        const color = priorityArray[task.priority].color

        const [editMode, setEditMod] = React.useState(false)
        const [changePrioprity, setChangePrioprity] = React.useState(false)
        const { priority } = useAppSelector((state) => state.prioritySlice)

        // const setOpen = (id: string) => {
        //     dispatch(setOpenPriorityСolumn(id))
        // }

        const deleteTaskFunc = (id: string) => {
            const obj = {
                id: id,
                column: column,
            }
            dispatch(deleteTask(obj))
        }

        // const onDoubleClickTextarea = () => {
        //     isValid && setEditMod(!editMode)
        // }

        const onEditClick = () => {
            if (!editMode) {
                setEditMod(true)
            }
        }

        return (
            <Draggable draggableId={task.id} index={index}>
                {(provided) => (
                    <div
                        className="block__inner_todo"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="block__inner-editPan" onClick={onEditClick}>
                            <img
                                className="block__inner-editPan-img"
                                src={String(pen)}
                                alt=""
                            ></img>
                        </div>

                        <div className="block__inner_content">
                            <div className="block__content">
                                <div
                                    className={editMode ? `` : `pretty__line ${color}`}
                                    // onClick={() => setOpen(task.id)}
                                ></div>
                                <div className="block__content_text_area">
                                    <TasksContent task={task} editMode={editMode} />
                                </div>
                            </div>
                        </div>
                        {editMode && (
                            <div>
                                {changePrioprity ? (
                                    <ul>
                                        <Priority
                                            priorityArray={priorityArray}
                                            id={task.id}
                                            setChangePrioprity={setChangePrioprity}
                                        />
                                    </ul>
                                ) : (
                                    <div>
                                        <div className="block__line block__line-task"></div>
                                        <div className="modalWindow__button">
                                            <div
                                                className={`block__button ${priorityArray[priority].color}`}
                                                onClick={() => setChangePrioprity(true)}
                                            >
                                                <p className="block__button_text">
                                                    {priorityArray[priority].description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Draggable>
        )
    }
)

export default Tasks
