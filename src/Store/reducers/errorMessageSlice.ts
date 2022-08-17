import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface errorMessageState {
    globalErrorMessage: string
    errorInfo: string
}

const initialState: errorMessageState = {
    globalErrorMessage: "",
    errorInfo: "",
}

export const errorMessageSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setGlobalErrorMessage: (state, action: PayloadAction<string>) => {
            state.globalErrorMessage = action.payload
        },
        setErrorInfo: (state, action: PayloadAction<string>) => {
            console.log(action.payload)
            state.errorInfo = action.payload
        },
        deleteErrorInfo: (state, action: PayloadAction<string>) => {
            state.errorInfo = ""
        },
        
    }
})

export const { setGlobalErrorMessage, setErrorInfo, deleteErrorInfo } = errorMessageSlice.actions
export default errorMessageSlice.reducer