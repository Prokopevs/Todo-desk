import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChangePrevTask, IPrevTask, ISetOpacity, ITasksInLS } from './types'


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
    tasksInLS: ITasksInLS
    editStatus: string[]
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
    selectedStatus: "",
    tasksInLS: {
        "": []
    },
    editStatus: []
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
        setTasksInLS: (state, action: PayloadAction<ITasksInLS>) => {
            state.tasksInLS = action.payload
        },
        addItemInEditStatus: (state, action: PayloadAction<string>) => {
            state.editStatus.push(action.payload)
        },
        deleteItemInEditStatus: (state, action: PayloadAction<string>) => {
            state.editStatus.splice(state.editStatus.indexOf(action.payload), 1)
        },
    }
})

export const { addTaskInEditArray, deleteTaskInEditArray, setQueryLoading, setPrevTaskObj, changePrevTaskObj, addTaskInPrevTaskObj, deleteTaskInPrevTaskObj, addTaskInSuccessArray, setOpacityButtons, removeOpacityButtons, deleteTaskInSuccessArray, setSelectedStatus, setTasksInLS, addItemInEditStatus, deleteItemInEditStatus } = editModeSlice.actions
export default editModeSlice.reducer