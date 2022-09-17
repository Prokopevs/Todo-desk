import React from "react"
import Tasks from "./Tasks"
import { Droppable } from "react-beautiful-dnd"
import { IStatus } from "../../models/dnd/IStatus"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setLineArray } from "../../Store/reducers/dnd/slice"
import Line from "./Line"
import ButtonPlus from "../Buttons/ButtonPlus"
import ButtonMinus from "../Buttons/ButtonMinus"
import EditStatus from "./EditStatus"
import { selectAuthorization, selectError } from "../../Store/selectors"
import { setSelectedStatus } from "../../Store/reducers/editMode/slice"
import { selectEditMode } from "../../Store/selectors"
import LongPressable from "react-longpressable"
import useLongPress from "../../hooks/useLongPress"

const Status: React.FC<IStatus> = React.memo(
    ({ column, tasks, priorityArray, index, setMSA }) => {
        const dispatch = useAppDispatch()
        const columnOrder = useAppSelector((state) => state.dndSlice.data.columnOrder)
        const { selectedStatus } = useAppSelector(selectEditMode)

        const [changeName, setChangeName] = React.useState(false)
        const { errorStatusInfo } = useAppSelector(selectError)
        const { isAuth } = useAppSelector(selectAuthorization)

        React.useEffect(() => {
            dispatch(setLineArray(Object.keys(columnOrder).length))
        }, [column])

        const onLongPress = () => {
            setChangeName(true)
            dispatch(setSelectedStatus(null))
        }

        const onClick = () => {
            if (selectedStatus === column.id) {
                dispatch(setSelectedStatus(null))
            } else {
                dispatch(setSelectedStatus(column.id))
            }
        }

        const defaultOptions = {
            shouldPreventDefault: true,
            delay: 300,
        }
        const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions)

        return (
            <Droppable droppableId={column!.id}>
                {(provided) => (
                    <>
                        <li className="col-md-4 block">
                            <Line array={"firstArray"} index={index} />
                            <div
                                className={
                                    selectedStatus === column.id
                                        ? "block__edit"
                                        : "block__edit_center"
                                }
                            >
                                {!changeName ? (
                                    <>
                                        <ButtonPlus
                                            position={"left"}
                                            column={column}
                                            setMSA={setMSA}
                                        />

                                        <div
                                            className={
                                                selectedStatus === column.id
                                                    ? "block__status-inner active"
                                                    : "block__status-inner"
                                            }
                                        >
                                            <div className="block__wrapper">
                                                <h1
                                                    className={
                                                        selectedStatus === column.id
                                                            ? "block__status_name active"
                                                            : "block__status_name"
                                                    }
                                                    {...longPressEvent}
                                                >
                                                    {column.name}
                                                </h1>

                                                <ButtonMinus column={column} />
                                            </div>
                                        </div>

                                        <ButtonPlus
                                            position={"right"}
                                            column={column}
                                            setMSA={setMSA}
                                        />
                                    </>
                                ) : (
                                    <EditStatus
                                        column={column}
                                        setChangeName={setChangeName}
                                    />
                                )}
                            </div>
                            <div
                                className="block__inner"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {tasks.map((task, index) => (
                                    <Tasks
                                        key={task.id}
                                        task={task}
                                        column={column}
                                        priorityArray={priorityArray}
                                        index={index}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                            <Line array={"secondArray"} index={index} />
                            {isAuth && errorStatusInfo[column.id]?.message && (
                                <div className="error_info status">
                                    {errorStatusInfo[column.id]?.message}
                                </div>
                            )}
                        </li>
                    </>
                )}
            </Droppable>
        )
    }
)

export default Status
