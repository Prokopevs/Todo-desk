import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IError, IErrorTasks } from '../../models/Errors/IErrorTask'

interface errorMessageState {
    globalErrorMessage: string
    errorInfo: string
    errorTaskInfo: IErrorTasks
}

const initialState: errorMessageState = {
    globalErrorMessage: "",
    errorInfo: "",
    errorTaskInfo: {
        "": {id: "", message: ""} 
    }
}

export const errorMessageSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setGlobalErrorMessage: (state, action: PayloadAction<string>) => {
            state.globalErrorMessage = action.payload
        },
        setErrorInfo: (state, action: PayloadAction<string>) => {
            state.errorInfo = action.payload
        },
        deleteErrorInfo: (state) => {
            state.errorInfo = ""
        },
        setErrorTaskInfo: (state, action: PayloadAction<IError>) => {
            const { id, message } = action.payload
            const data = { id, message }
            state.errorTaskInfo[id] = data
        },
        deleteErrorTaskInfo: (state, action: PayloadAction<string>) => {
            delete state.errorTaskInfo[action.payload]
        },
    }
})

export const { setGlobalErrorMessage, setErrorInfo, deleteErrorInfo, setErrorTaskInfo, deleteErrorTaskInfo } = errorMessageSlice.actions
export default errorMessageSlice.reducer