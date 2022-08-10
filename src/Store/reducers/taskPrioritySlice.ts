import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TaskPriorityState {
   priority: number
}

const initialState: TaskPriorityState = {
    priority: 3
}

export const taskPrioritySlice = createSlice({
    name: 'taskPriority',
    initialState,
    reducers: {
        setTaskPriority: (state, action: PayloadAction<number>) => {
            state.priority = action.payload
        },
    }
})

export const { setTaskPriority } = taskPrioritySlice.actions
export default taskPrioritySlice.reducer