import { IColumn } from './../../models/dnd/IData';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialData from "../../components/Desk/initial-data";
import { IColumns, ITasks } from "../../models/dnd/IData";
import { IResult } from "../../models/dnd/IResult";
import { start } from 'repl';

interface DndState {
    data: {
        tasks: ITasks,
        columns: IColumns,
        columnOrder: string[]
    },
    result: IResult,
    start: IColumn,
    finish: IColumn
}
  
const initialState: DndState = {
    data: initialData,
    result: {
        destination: {
            droppableId: "",
            index: null
        },
        source: {
            index: null, 
            droppableId: ""
        },
        draggableId: "",
    },
    start: {
        id: "",
        title: "",
        taskIds: [],
    },
    finish: {
        id: "",
        title: "",
        taskIds: [],
    },
}

export const dndSlice = createSlice({
    name: 'dnd',
    initialState,
    reducers: {
        setResult: (state, action: PayloadAction<IResult>) => {
            state.result.destination = action.payload.destination
            state.result.source = action.payload.source
            state.result.draggableId = action.payload.draggableId
        },
        setStart: (state, action: PayloadAction<IColumn>) => {
            state.start = action.payload
        },
        setFinish: (state, action: PayloadAction<IColumn>) => {
            state.finish = action.payload
        },
        reorderTaskInOwnStatus: (state) => {
            const newTaskIds = state.start.taskIds // получили массив с тасками taskIds: ["0", "1"]
            newTaskIds.splice(state.result.source.index!, 1) // удалили элемент, который тянули
            newTaskIds.splice(state.result.destination.index!, 0, state.result.draggableId) // вставили этот элемент в новое место
            const Status = state.data.columns[state.start.id] // Status (столбец где произошло изменение) 
            Status.taskIds = newTaskIds // заменили старый массив на новый 
        }
    }
})

export const { setResult, setStart, setFinish, reorderTaskInOwnStatus } = dndSlice.actions

export default dndSlice.reducer