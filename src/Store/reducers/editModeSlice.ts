import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface editModeState {
    editArray: string[]
}

const initialState: editModeState = {
    editArray: [],
}

export const editModeSlice = createSlice({
    name: 'editMode',
    initialState,
    reducers: {
        setEditArray: (state, action: PayloadAction<string>) => {
            state.editArray.push(action.payload)
        },
        takeEditArray: (state, action: PayloadAction<string>) => {
            state.editArray.splice(state.editArray.indexOf(action.payload), 1)
        },
    }
})

export const { setEditArray, takeEditArray } = editModeSlice.actions
export default editModeSlice.reducer