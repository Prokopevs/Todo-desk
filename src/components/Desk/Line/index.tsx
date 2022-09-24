import React from "react"
import { useAppSelector } from "../../../hooks/redux"
import useWindowDimensions from "../../../hooks/useWindowDimensions"
import { ILine } from "../../../models/dnd/ILine"
import { selectDnd } from "../../../Store/selectors"

const Line: React.FC<ILine> = ({ array, index }) => {
    const { lineArrays } = useAppSelector(selectDnd)
    const { width } = useWindowDimensions()

    return (
        <>
            {" "}
            {lineArrays[array].includes(index) && width! > 767 && (
                <div className="line"></div>
            )}
        </>
    )
}

export default Line
