import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IError, IErrorGlobal, IErrorTasks } from './types'

interface errorMessageState {
    globalErrorMessage: string
    errorInfo: string
    errorInfoStatusName: IErrorTasks
    errorTaskInfo: IErrorTasks
    errorStatusInfo: IErrorTasks
}

const initialState: errorMessageState = {
    globalErrorMessage: "",
    errorInfo: "",
    errorInfoStatusName: {
        "": {id: "", message: ""} 
    },
    errorTaskInfo: {
        "": {id: "", message: ""} 
    },
    errorStatusInfo: {
        "": {id: "", message: ""} 
    }
}

export const errorMessageSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setGlobalErrorMessage: (state, action: PayloadAction<IErrorGlobal>) => {
            const data = action.payload.status + action.payload.statusText
            state.globalErrorMessage = data
        },
        setErrorInfo: (state, action: PayloadAction<string>) => {
            state.errorInfo = action.payload
        },
        deleteErrorInfo: (state) => {
            state.errorInfo = ""
        },
        setErrorStatusName: (state, action: PayloadAction<IError>) => {
            const { id, message } = action.payload
            const data = { id, message }
            state.errorInfoStatusName[id] = data
        },
        deleteErrorStatusName: (state, action: PayloadAction<string>) => {
            delete state.errorInfoStatusName[action.payload]
        },
        setErrorTaskInfo: (state, action: PayloadAction<IError>) => {
            const { id, message } = action.payload
            const data = { id, message }
            state.errorTaskInfo[id] = data
        },
        deleteErrorTaskInfo: (state, action: PayloadAction<string>) => {
            delete state.errorTaskInfo[action.payload]
        },
        setErrorStatusInfo: (state, action: PayloadAction<IError>) => {
            const { id, message } = action.payload
            const data = { id, message }
            state.errorStatusInfo[id] = data
        },
        deleteErrorStatusInfo: (state, action: PayloadAction<string>) => {
            delete state.errorStatusInfo[action.payload]
        },
    }
})

export const { setGlobalErrorMessage, setErrorInfo, deleteErrorInfo, setErrorTaskInfo, deleteErrorTaskInfo, setErrorStatusName, deleteErrorStatusName, setErrorStatusInfo, deleteErrorStatusInfo } = errorMessageSlice.actions
export default errorMessageSlice.reducer