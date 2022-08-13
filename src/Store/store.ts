import editModeSlice from './reducers/editModeSlice';
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import authorizationSlice from './reducers/authorizationSlice'
import dndSlice from './reducers/dndSlice'
import prioritySlice from './reducers/prioritySlice';
import contentSlice from './reducers/contentSlice';
import rootSaga from './Sagas';

const saga = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        authorizationSlice,
        dndSlice,
        prioritySlice,
        editModeSlice,
    },
    middleware: [saga]
})
saga.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch