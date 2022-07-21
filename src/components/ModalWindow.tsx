import React from 'react'
import { CSSTransition } from 'react-transition-group';

const ModalWindow = ({ active, setActive }) => {
    return (
        <CSSTransition in={active} timeout={200} classNames="my-node" unmountOnExit>
            <div className="modalWindow">
                <div className="modalWindow_content">
                    <div className="form_container form_container-modalWindow">
                        <p className="modalWindow__text text-center">Add task</p>
                        <div className="block__line block__line-form"></div>

                        <p className="modalWindow__text-description">Content</p>
                        <div className="form__input_holder">
                            <textarea placeholder="Write task content here..." className="form__input form__input-textarea"></textarea>
                        </div>

                        <p className="modalWindow__text-description">Priority</p>
                        <button className="button__big">High</button>

                        <button className="button__big button__big-green">Submit</button>
                    </div>

                    <div className="close" onClick={() => setActive(false)}>
                        <div className="close__button"></div>
                    </div>
                </div>
            </div>
        </CSSTransition>

    )
}

export default ModalWindow