import taskPrioritySlice from './reducers/taskPrioritySlice';
import contentSlice from './reducers/contentSlice';
import { configureStore } from '@reduxjs/toolkit'
import authorizationSlice from './reducers/authorizationSlice'
import dndSlice from './reducers/dndSlice'
import prioritySlice from './reducers/prioritySlice';

export const store = configureStore({
    reducer: {
        authorizationSlice,
        dndSlice,
        prioritySlice,
        contentSlice,
        taskPrioritySlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch