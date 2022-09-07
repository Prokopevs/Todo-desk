import React from "react"
import Tasks from "./Tasks"
import { Droppable } from "react-beautiful-dnd"
import { IStatus } from "../../models/dnd/IStatus"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setLineArray } from "../../Store/reducers/dndSlice"
import Line from "./Line"
import ButtonPlus from "../Buttons/ButtonPlus"
import ButtonMinus from "../Buttons/ButtonMinus"
import EditStatus from "./EditStatus"
import { selectAuthorization, selectError } from "../../Store/selectors"

const Status: React.FC<IStatus> = React.memo(
    ({ column, tasks, priorityArray, index }) => {
        const dispatch = useAppDispatch()
        const columnOrder = useAppSelector((state) => state.dndSlice.data.columnOrder)
        const [hover, setHover] = React.useState("")
        const [changeName, setChangeName] = React.useState(false)
        const { errorStatusInfo } = useAppSelector(selectError)
        const { isAuth } = useAppSelector(selectAuthorization)

        React.useEffect(() => {
            dispatch(setLineArray(Object.keys(columnOrder).length))
        }, [column])

        const handleMouseOver = (id: string) => {
            setHover(id)
        }

        const handleMouseOut = (id: string) => {
            setHover("")
        }

        const [waitingClick, setWaitingClick] = React.useState<null | NodeJS.Timeout>(
            null
        )
        const [lastClick, setLastClick] = React.useState(0)
        const processClick = (e) => {
            if (lastClick && e.timeStamp - lastClick < 250 && waitingClick) {
                setLastClick(0)
                clearTimeout(waitingClick)
                setWaitingClick(null)
                setChangeName(true)
            } else {
                setLastClick(e.timeStamp)
                setWaitingClick(
                    setTimeout(() => {
                        setWaitingClick(null)
                    }, 251)
                )
            }
        }

        return (
            <Droppable droppableId={column!.id}>
                {(provided) => (
                    <>
                        <li className="col-md-4 block">
                            <Line array={"firstArray"} index={index} />
                            <div
                                className={"block__edit"}
                                onMouseOver={() => {
                                    handleMouseOver(column.id)
                                }}
                                onMouseOut={() => {
                                    handleMouseOut(column.id)
                                }}
                            >
                                {!changeName ? (
                                    <>
                                        <ButtonPlus
                                            position={"left"}
                                            hover={hover}
                                            column={column}
                                        />

                                        <div className="block__status-inner">
                                            <div className="block__wrapper">
                                                <h1
                                                    className="block__status_name"
                                                    onClick={(e) => processClick(e)}
                                                >
                                                    {column.name}
                                                </h1>
                                            </div>
                                            <ButtonMinus column={column} hover={hover} />
                                        </div>

                                        <ButtonPlus
                                            position={"right"}
                                            hover={hover}
                                            column={column}
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
