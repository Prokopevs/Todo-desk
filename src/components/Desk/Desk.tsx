import React from 'react'
import s from './Desk.module.css'

const Desk = () => {
    return (
        <div className={`row ${s.margin}`}>
            <div className={`col-12 ${s.desk}`}>
                <div className="row">
                    <div className={`col-md-4 ${s.block}`}>
                        <h1 className={s.block__name}>To do</h1>
                        <div className={s.block__inner}>
                            <div className={s.block__inner_todo}>
                                <div className={s.block__content}>
                                    <div className={s.pretty__line}></div>
                                    <div className={s.block__content_input} contentEditable="true"></div>
                                </div>
                            </div>
                            <div className={s.line}></div>
                        </div>
                    </div>
                    <div className={`col-md-4 ${s.block}`}>
                        <h1 className={s.block__name}>In progress</h1>
                        <div className={s.block__inner}>
                            <div className={s.block__inner_todo}>
                                <div className={s.block__content}>
                                    <div className={s.pretty__line}></div>
                                    <div className={s.block__content_text}>Do some shit blah blah blah blah blah shit blah blah blah blah blahshit blah blah blah blah blahshit blah lah blahshit blah blah blah blah blah blah blah</div>
                                </div>
                            </div>
                            <div className={s.line}></div>
                        </div>
                    </div>
                    <div className={`col-md-4 ${s.block}`}>
                        <h1 className={s.block__name}>Done</h1>
                        <div className={s.block__inner}>
                            <div className={s.block__inner_todo}>
                                <div className={s.block__content}>
                                    <div className={s.pretty__line}></div>
                                    <div className={s.block__content_text}>Do some shit blah blah blah blah blah shit blah blah blah blah blahshit blah blah blah blah blahshit blah lah blahshit blah blah blah blah blah</div>
                                </div>
                            </div>
                            <div className={s.line}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Desk