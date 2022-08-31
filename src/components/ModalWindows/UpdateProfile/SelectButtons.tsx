import React from "react"
import { cross, vector } from "../../../pictures"

const SelectButtons = () => {
    return (
        <>
            <div className="block__content_selection settings">
                <button
                    className="block__content_selection_button delete settings"
                    // onClick={() => deleteTaskFunc(task.id)}
                    // disabled={
                    //     opacityButtons && opacityButtons["delete"].includes(task.id)
                    // }
                >
                    <img
                        className="block__content_selection_img delete settings"
                        src={String(cross)}
                        alt=""
                    ></img>
                    <p className="block__content_selection_text settings">Discard</p>
                </button>

                <button
                    className="block__content_selection_button apply settings"
                    type="submit"
                    // disabled={
                    //     !isValid ||
                    //     isOpen ||
                    //     (opacityButtons && opacityButtons["apply"].includes(task.id))
                    // }
                >
                    <img
                        className="block__content_selection_img apply settings"
                        src={String(vector)}
                        alt=""
                    ></img>
                    <p className="block__content_selection_text settings">Apply</p>
                </button>
            </div>
            {/* {isAuth && errorTaskInfo[task.id]?.message && (
                <div className="error_info task">{errorTaskInfo[task.id]?.message}</div>
            )} */}
        </>
    )
}

export default SelectButtons
