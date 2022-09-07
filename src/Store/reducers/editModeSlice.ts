import { ISetOpacity } from '../../models/EditMode/ISetOpacity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChangePrevTask } from '../../models/Task/IChangePrevTask'
import { IPrevTask} from '../../models/Task/IPrevTask'

interface editModeState {
    editArray: string[]
    queryLoading: boolean
    prevTaskObj: IPrevTask
    successTasksAfterSagaRequest: string[]
    opacityButtons: {
        delete: string[]
        apply: string[]
    }
    selectedStatus: string | null
}

const initialState: editModeState = {
    editArray: [], // для отключения dragable
    queryLoading: false,
    prevTaskObj: {
        "": { id: "", priority: null, content: ""}
    },
    successTasksAfterSagaRequest: [],    // для того чтобы закрыть окно редактирования после успешного запроса на сервер
    opacityButtons: {
        delete: [],
        apply: []
    },
    selectedStatus: ""
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
        },
        addTaskInPrevTaskObj:  (state, action: PayloadAction<IChangePrevTask>) => {
            const { content, id, priority, status_id } = action.payload
            const data = { id, priority, content }
            state.prevTaskObj[id] = data
        },
        deleteTaskInPrevTaskObj:  (state, action: PayloadAction<string>) => {
            delete state.prevTaskObj[action.payload]
        },
        setOpacityButtons: (state, action: PayloadAction<ISetOpacity>) => {
            state.opacityButtons[action.payload.arrName].push(action.payload.id)
        },
        removeOpacityButtons: (state, action: PayloadAction<ISetOpacity>) => {
            state.opacityButtons[action.payload.arrName] = []
        },
        setSelectedStatus: (state, action: PayloadAction<string | null>) => {
            state.selectedStatus = action.payload
        },
    }
})

export const { addTaskInEditArray, deleteTaskInEditArray, setQueryLoading, setPrevTaskObj, changePrevTaskObj, addTaskInPrevTaskObj, deleteTaskInPrevTaskObj, addTaskInSuccessArray, setOpacityButtons, removeOpacityButtons, deleteTaskInSuccessArray, setSelectedStatus } = editModeSlice.actions
export default editModeSlice.reducer