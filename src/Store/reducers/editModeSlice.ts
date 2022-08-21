import { ISetOpacity } from './../../models/ISetOpacity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChangePrevTask } from '../../models/Task/IChangePrevTask'
import { IPrevTask } from '../../models/Task/IPrevTask'

interface editModeState {
    editArray: string[]
    queryLoading: boolean
    prevTaskObj: IPrevTask
    successTasksAfterSagaRequest: string[]
    opasityButtons: {
        delete: string[]
        apply: string[]
    }
}

const initialState: editModeState = {
    editArray: [], // для отключения dragable
    queryLoading: false,
    prevTaskObj: {
        id: "",
        priority: null,
        content: ""
    },
    successTasksAfterSagaRequest: [],    // для того чтобы закрыть окно редактирования после успешного запроса на сервер
    opasityButtons: {
        delete: [],
        apply: []
    }
}

export const editModeSlice = createSlice({
    name: 'editMode',
    initialState,
    reducers: {
        addTaskInEditArray: (state, action: PayloadAction<string>) => {
            state.editArray.push(action.payload)
        },
        deleteTaskInEditArray: (state, action: PayloadAction<string>) => {
            state.editArray.splice(state.editArray.indexOf(action.payload), 1)
        },
        setQueryLoading: (state, action: PayloadAction<boolean>) => {
            state.queryLoading = action.payload
        },
        addTaskInSuccessArray: (state, action: PayloadAction<string>) => {
            state.successTasksAfterSagaRequest.push(action.payload)
        },
        deleteTaskInSuccessArray: (state, action: PayloadAction<string>) => {
            state.successTasksAfterSagaRequest.splice(state.successTasksAfterSagaRequest.indexOf(action.payload), 1)
        },
        setPrevTaskObj: (state, action: PayloadAction<IPrevTask>) => {
            state.prevTaskObj = action.payload
        },
        changePrevTaskObj: (state, action: PayloadAction<IChangePrevTask>) => {
            state.prevTaskObj[action.payload.id].content = action.payload.content
            state.prevTaskObj[action.payload.id].priority = action.payload.priority 
            //  добавить логику при добавлении таски. В массив  prevTaskObj должен добавляться этот элемент 
            // добавить логику при удалении таски. 
        },
        addTaskInPrevTaskObj:  (state, action: PayloadAction<IChangePrevTask>) => {
            const { content, id, priority, status_id } = action.payload
            const data = { id, priority, content }
            state.prevTaskObj[id] = data
        },
        deleteTaskInPrevTaskObj:  (state, action: PayloadAction<string>) => {
            delete state.prevTaskObj[action.payload]
        },
        setOpasityButtons: (state, action: PayloadAction<ISetOpacity>) => {
            state.opasityButtons[action.payload.arrName].push(action.payload.id)
        },
        removeOpasityButtons: (state, action: PayloadAction<ISetOpacity>) => {
            state.opasityButtons[action.payload.arrName] = []
        },
    }
})

export const { addTaskInEditArray, deleteTaskInEditArray, setQueryLoading, setPrevTaskObj, changePrevTaskObj, addTaskInPrevTaskObj, deleteTaskInPrevTaskObj, addTaskInSuccessArray, setOpasityButtons, removeOpasityButtons, deleteTaskInSuccessArray } = editModeSlice.actions
export default editModeSlice.reducer