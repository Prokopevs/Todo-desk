import editModeSlice from './reducers/editMode/slice';
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import authorizationSlice from './reducers/authorization/slice'
import dndSlice from './reducers/dnd/slice'
import prioritySlice from './reducers/priority/slice';
import errorMessageSlice from './reducers/errorMessage/slice';
import rootSaga from './Sagas';

const saga = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        authorizationSlice,
        dndSlice,
        prioritySlice,
        editModeSlice,
        errorMessageSlice,
    },
    middleware: [saga]
})
saga.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch