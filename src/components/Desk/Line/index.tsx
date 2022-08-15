import React from "react"
import { useAppSelector } from "../../../hooks/redux"
import { ILine } from "../../../models/dnd/ILine"

const Line: React.FC<ILine> = ({ array, index }) => {
    const lineArrays = useAppSelector((state) => state.dndSlice.lineArrays)
    return <> {lineArrays[array].includes(index) && <div className="line"></div>}</>
}

export default Line
