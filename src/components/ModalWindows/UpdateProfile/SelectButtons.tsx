import React from "react"
import { useAppSelector } from "../../../hooks/redux"
import { cross, vector } from "../../../pictures"
import { selectEditMode, selectError } from "../../../Store/selectors"

const SelectButtons = ({ closeStatusWindow }) => {
    const { queryLoading } = useAppSelector(selectEditMode)
    const { errorInfo } = useAppSelector(selectError)

    return (
        <>
            <div className="block__content_selection settings">
                <div
                    className="block__content_selection_button delete settings"
                    onClick={() => closeStatusWindow()}
                >
                    <img
                        className="block__content_selection_img delete settings"
                        src={String(cross)}
                        alt=""
                    ></img>
                    <p className="block__content_selection_text settings">Discard</p>
                </div>

                <button
                    className="block__content_selection_button apply settings"
                    type="submit"
                    disabled={queryLoading}
                >
                    <img
                        className="block__content_selection_img apply settings"
                        src={String(vector)}
                        alt=""
                    ></img>
                    <p className="block__content_selection_text settings">Apply</p>
                </button>
            </div>
            {errorInfo && <div className="error_info">{errorInfo}</div>}   
        </>
    )
}

export default SelectButtons
