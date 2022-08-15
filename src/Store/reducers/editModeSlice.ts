import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface editModeState {
    editArray: string[]
    queryLoading: boolean
    onDeleteClick: boolean
}

const initialState: editModeState = {
    editArray: [],
    queryLoading: false,
    onDeleteClick: false,
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
        setQueryLoading: (state, action: PayloadAction<boolean>) => {
            state.queryLoading = action.payload
        },
        setDeleteClick: (state, action: PayloadAction<boolean>) => {
            state.onDeleteClick = action.payload
        },
    }
})

export const { setEditArray, takeEditArray, setQueryLoading, setDeleteClick } = editModeSlice.actions
export default editModeSlice.reducer