import React from "react"
import Tasks from "./Tasks"
import { Droppable } from "react-beautiful-dnd"
import { IStatus } from "../../models/dnd/IStatus"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setLineArray } from "../../Store/reducers/dndSlice"
import Line from "./Line"
import ButtonPlus from "../Buttons/ButtonPlus"
import ButtonMinus from "../Buttons/ButtonMinus"
import EdditStatus from "./EdditStatus"

const Status: React.FC<IStatus> = React.memo(
    ({ column, tasks, priorityArray, index }) => {
        const dispatch = useAppDispatch()
        const columnOrder = useAppSelector((state) => state.dndSlice.data.columnOrder)
        const [hover, setHover] = React.useState("")
        const [changeName, setchangeName] = React.useState(false)

        React.useEffect(() => {
            dispatch(setLineArray(Object.keys(columnOrder).length))
        }, [column])

        const handleMouseOver = (id: string) => {
            setHover(id)
        }

        const handleMouseOut = (id: string) => {
            setHover("")
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
                                                <h1 className="block__status_name" 
                                                    onDoubleClick={() => setchangeName(true)}>
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
                                    <EdditStatus column={column} setchangeName={setchangeName}/>
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
                        </li>
                    </>
                )}
            </Droppable>
        )
    }
)

export default Status
