import React from "react"
import Priority from "../Priority"
import { Draggable } from "react-beautiful-dnd"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { deleteTask, setOpenPriorityСolumn } from "../../Store/reducers/dndSlice"
import { ITasksProps } from "../../models/ITasksProps"
import TasksContent from "./TasksContent"
import { useForm } from "react-hook-form"

type Click = MouseEvent & {
    path: Node[]
}

const Tasks: React.FC<ITasksProps> = React.memo(
    ({ task, index, priorityArray, column }) => {
        const TaskRef = React.useRef<HTMLDivElement>(null)
        const { isValid } = useAppSelector((state) => state.contentSlice)
        const dispatch = useAppDispatch()
        const color = priorityArray[task.priority].color

        const [editMode, setEditMod] = React.useState(false)

        const setOpen = (id: string) => {
            dispatch(setOpenPriorityСolumn(id))
        }

        const deleteTaskFunc = (id: string) => {
            const obj = {
                id: id,
                column: column,
            }
            dispatch(deleteTask(obj))
        }

        const onDoubleClickTextarea = () => {
            isValid && setEditMod(!editMode)
        }

        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                const _event = event as Click
                if (TaskRef.current && !_event.path.includes(TaskRef.current)) {
                    isValid && setEditMod(false)
                }
            }
            document.body.addEventListener("click", handleClickOutside)

            return () => document.body.removeEventListener("click", handleClickOutside)
        }, [isValid])

        return (
            <Draggable draggableId={task.id} index={index}>
                {(provided) => (
                    <div
                        className={
                            editMode ? "block__inner_todo editMode" : "block__inner_todo"
                        }
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div
                            className={
                                editMode
                                    ? "block__inner_delete editMode"
                                    : "block__inner_delete"
                            }
                            onClick={() => deleteTaskFunc(task.id)}
                        >
                            <div className="close__button task"></div>
                        </div>
                        <div ref={TaskRef} className="block__inner_content">
                            <div
                                className={
                                    editMode
                                        ? "block__content editMode"
                                        : "block__content"
                                }
                            >
                                <div
                                    className={`pretty__line ${color}`}
                                    onClick={() => setOpen(task.id)}
                                ></div>
                                <div
                                    className="block__content_text_area"
                                    onDoubleClick={() => onDoubleClickTextarea()}
                                >
                                    <TasksContent task={task} editMode={editMode} />
                                </div>
                            </div>
                        </div>

                        {task.isOpen && (
                            <Priority priorityArray={priorityArray} id={task.id} />
                        )}
                    </div>
                )}
            </Draggable>
        )
    }
)

export default Tasks
