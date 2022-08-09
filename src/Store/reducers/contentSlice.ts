import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface contentState {
    isValid: boolean
}

const initialState: contentState = {
    isValid: true
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setIsValid: (state, action: PayloadAction<boolean>) => {
            state.isValid = action.payload
        },
    }
})

export const { setIsValid, } = contentSlice.actions

export default contentSlice.reducer