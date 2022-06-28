import React from 'react'
import AddTask from './AddTask'
import Priority from './Priority'

const Desk = () => {
    return (
        <div className="row margin">
            <div className="col-12 desk">
                <ul className="row">
                    <li className="col-md-4 block">
                        <h1 className="block__name">To do</h1>
                        <div className="block__inner">
                            <div className="block__inner_todo">
                                <div className="block__content">
                                    <div className="pretty__line"></div>
                                    <div className="block__content_input" contentEditable="true"></div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 block">
                        <h1 className="block__name">In progress</h1>
                        <div className="block__inner">
                            <div className="block__inner_todo">      
                                    <div className="block__content">
                                        <div className="pretty__line"></div>
                                        <p className="block__content_text">Do some shit blah blah blah blah blah shit blah blah blah blah blahshit blah blah blah blah blahshit blah lah blahshit blah blah blah blah blah blah blah </p>
                                    </div>
                                    <Priority />
                            </div>
                        </div>
                    </li>
                    <li className="col-md-4 block">
                        <h1 className="block__name">Done</h1>
                        <div className="block__inner">
                            <div className="block__inner_todo">
                                <div className="block__content">
                                    <div className="pretty__line"></div>
                                    <p className="block__content_text">Do some shit blah blah blah blah blah shit blah blah blah blah blahshit blah blah blah blah blahshit blah lah blahshit blah blah blah blah blah</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <AddTask />
            </div>
        </div>
    )
}

export default Desk