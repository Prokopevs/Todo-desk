import { IAddTask } from './../../models/IAddTask';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PriorityState {
   priority: number
}

const initialState: PriorityState = {
    priority: 3
}

export const prioritySlice = createSlice({
    name: 'priority',
    initialState,
    reducers: {
        setPriority: (state, action: PayloadAction<number>) => {
            state.priority = action.payload
        },
        addTask: (state, action: PayloadAction<IAddTask>) => {
            
        },
    }
})

export const { setPriority, addTask } = prioritySlice.actions

export default prioritySlice.reducer