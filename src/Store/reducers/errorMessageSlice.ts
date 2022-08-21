import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IErrorTask, IErrorTasks } from '../../models/IErrorTask'

interface errorMessageState {
    globalErrorMessage: string
    errorInfo: string
    errorTaskInfo: IErrorTasks
}

const initialState: errorMessageState = {
    globalErrorMessage: "",
    errorInfo: "",
    errorTaskInfo: {
        id: null,
        message: null
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
        deleteErrorInfo: (state, action: PayloadAction<string>) => {
            state.errorInfo = ""
        },
        setErrorTaskInfo: (state, action: PayloadAction<IErrorTask>) => {
            const { id, message } = action.payload
            const data = { id, message }
            state.errorTaskInfo[id] = data
        },
        deleteErrorTaskInfo: (state, action: PayloadAction<string>) => {
            console.log(action.payload)
            delete state.errorTaskInfo[action.payload]
        },
    }
})

export const { setGlobalErrorMessage, setErrorInfo, deleteErrorInfo, setErrorTaskInfo, deleteErrorTaskInfo } = errorMessageSlice.actions
export default errorMessageSlice.reducer