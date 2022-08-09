import React from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import { CSSTransition } from "react-transition-group"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { ModalWindowContext } from "../../App";
import { addStatus } from "../../Store/reducers/dndSlice";

type Inputs = {
    name: string,
    priority: string,
};

const StatusModalWindow = () => {
    const dispatch = useAppDispatch()
    const { modalStatusActive, setStatusActive } = React.useContext(ModalWindowContext)
    const  {data}  = useAppSelector((state) => state.dndSlice)
    const maxArrLength = data.columnOrder.length + 1
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({mode: "onBlur"});
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(addStatus(data))
        setStatusActive(false)
        reset()
    }
    const closeStatusWindow = () => {
        setStatusActive(false)
        setTimeout(() => reset(), 200);
    }

    return (
        <CSSTransition in={modalStatusActive} timeout={200} classNames="my-node" unmountOnExit>
            <div className="modalWindow">
                <div className="modalWindow_content">
                    <div className="form_container form_container-modalWindow">
                        <p className="modalWindow__text text-center">Add status</p>
                        <div className="block__line block__line-form"></div>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <p className="modalWindow__text-description">Name</p>
                            <div className={errors?.name ? "form__input_holder error-holder" : "form__input_holder"}>
                                <input
                                    placeholder="Write status name here..."
                                    className={errors?.name ? "form__input error-input" : "form__input "}
                                    autoComplete="off"
                                    {...register("name",
                                    { required: "cannot be empty" })}
                                ></input>
                            </div>
                            <div className="error__message">
                                {errors?.name && <p className="error__message_text">{errors?.name?.message}</p>}
                            </div>

                            <p className="modalWindow__text-description">Priority</p>
                            <div className={errors?.priority ? "form__input_holder error-holder margin" : "form__input_holder margin"}>
                                <input
                                    placeholder={`Write status priority from 1 to ${maxArrLength}`}
                                    className={errors?.priority ? "form__input error-input" : "form__input"}
                                    autoComplete="off"
                                    {...register("priority",
                                        { required: "cannot be empty",
                                        min: {
                                            value: 1,
                                            message: "cannot be less than 1"
                                        },
                                        max: {
                                            value: maxArrLength,
                                            message: `cannot be more than ${maxArrLength}`
                                        },
                                        validate: {
                                            number: (value) => /[0-9]/.test(value) || 'must be a number' 
                                        }
                                    })}
                                ></input>
                            </div>
                            <div className="error__message">
                                {errors?.priority && <p className="error__message_text top">{errors?.priority?.message}</p>}
                            </div>

                            <div className="block__line block__line-form"></div>

                            <button type="submit" className="block__button submit big mb">Submit</button>

                        </form>
                    </div>

                    <div className="close" onClick={() => closeStatusWindow()}>
                        <div className="close__button"></div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default StatusModalWindow
