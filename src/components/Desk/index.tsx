import React from "react"
import AddTask from "../AddTask"
import Status from "./Status"
import { DragDropContext } from "react-beautiful-dnd"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { selectAuthorization, selectDnd } from "../../Store/selectors"
import Button from "../Button"
import { onDragEnd } from "./onDragEnd"
import { IStorage } from "../../models/EditMode/IStorage"

const Desk: React.FC<IStorage> = ({ setMTA, setMSA }) => {
    const dispatch = useAppDispatch()
    const { isAuth, user } = useAppSelector(selectAuthorization)
    const { data } = useAppSelector(selectDnd)
    let columnsLength
    if (data) {
        columnsLength = Object.keys(data.columns).length
    }

    const onDrag = (result) => {
        onDragEnd(result, dispatch, data, isAuth)
    }

    return (
        <DragDropContext onDragEnd={onDrag}>
            <div className="row margin">
                <div className="col-12 desk">
                    <ul className={isAuth ? "row row-padding mg" : "row row-padding"}>
                        {columnsLength ? (
                            data.columnOrder.map((columnId, index) => {
                                const column = data.columns[columnId] // id: '1' name: 'To do', taskIds: ['0', '1']
                                const tasks = column.taskIds.map(
                                    (taskId) => data.tasks[taskId]
                                )
                                return (
                                    <Status
                                        key={column.id}
                                        column={column}
                                        tasks={tasks}
                                        index={index + 1}
                                        setMSA={setMSA}
                                    />
                                )
                            })
                        ) : (
                            <div className="demo__center">
                                <p className="demo__text">
                                    Click on button to add status
                                </p>
                                <Button setMSA={setMSA} />
                            </div>
                        )}
                    </ul>
                    {!isAuth && (
                        <p className="demo__description">
                            This is only a demo, all your work will not be saved. Log in
                            to get full functionality.
                        </p>
                    )}
                </div>
                {columnsLength !== 0 && <AddTask setMTA={setMTA} />}
            </div>
            {!user.emailConfirmed && isAuth && (
                <p className="demo__email_confirmed">
                    Please go to your email and verify your account otherwise it will be
                    deleted.
                </p>
            )}
        </DragDropContext>
    )
}

export default Desk
