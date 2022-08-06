import React from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import { CSSTransition } from "react-transition-group"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { IDesk } from "../../models/IDesk"
import PriorityButtons from "../PriorityButtons"
import priorityArray from "../Desk/priorityArray";
import { addTask } from "../../Store/reducers/dndSlice";
import { ModalWindowContext } from "../../App";

type Inputs = {
    content: string,
    priority: number
};

const TaskModalWindow = () => {
    const dispatch = useAppDispatch()
    const { priority } = useAppSelector(state => state.prioritySlice)
    const [changePrioprity, setChangePrioprity] = React.useState(false)
    const { modalTaskActive, setModalTaskActive } = React.useContext(ModalWindowContext)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({mode: "onBlur"});
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data["priority"] = priority
        dispatch(addTask(data))
        setModalTaskActive(false)
        reset()
    }
    const closeTaskWindow = () => {
        setModalTaskActive(false)
        setTimeout(() => reset(), 200);
    }

    return (
        <CSSTransition in={modalTaskActive} timeout={200} classNames="my-node" unmountOnExit>
            <div className="modalWindow">
                <div className="modalWindow_content">
                    <div className="form_container form_container-modalWindow">
                        <p className="modalWindow__text text-center">Add task</p>
                        <div className="block__line block__line-form"></div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p className="modalWindow__text-description">Content</p>
                            <div className={errors?.content ? "form__input_holder error-holder" : "form__input_holder"}>
                                <textarea
                                    placeholder="Write task content here..."
                                    className={errors?.content ? "form__input textarea error-input" : "form__input textarea"}
                                    autoComplete="off"
                                    {...register("content",
                                    { required: "cannot be empty" })}
                                ></textarea>
                            </div>

                            <div className="error__message">
                            {errors?.content && <p className="error__message_text">{errors?.content?.message}</p>}
                            </div>

                            <p className="modalWindow__text-description">Priority</p>

                            {changePrioprity
                                ? <ul><PriorityButtons setChangePrioprity={setChangePrioprity}/></ul>
                                :<div className="modalWindow__button">
                                    <button className={`block__button ${priorityArray[priority].color} big mr1`} 
                                    onClick={() => setChangePrioprity(true)}>
                                        {priorityArray[priority].description}
                                    </button>
                                </div>}

                            <div className="block__line block__line-form"></div>
                            <button type="submit" disabled={changePrioprity} className="block__button submit big mb">Submit</button>
                        </form>
                    </div>

                    <div className="close" onClick={() => closeTaskWindow()}>
                        <div className="close__button"></div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default TaskModalWindow
