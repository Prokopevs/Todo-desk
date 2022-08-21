import { mapColumnOrder, mapResponseStatus } from './sagaHelpers/statusHelper';
import { takeEvery, put, call } from 'redux-saga/effects';
import { deleteStatusService, getStatusService, postStatusService } from '../../services/StatusService';
import { addStatus, deleteStatus, setColumnOrder, setQueryFlag, setStatuses } from '../reducers/dndSlice';
import { setQueryLoading } from '../reducers/editModeSlice';
import { setErrorInfo, setGlobalErrorMessage } from '../reducers/errorMessageSlice';

export function* handleGetStatus() {
    try {
        const response = yield call(getStatusService)
        const arr = JSON.parse(JSON.stringify(response.data))

        const StatusObj = mapResponseStatus(arr)
        const columnOrderArr = mapColumnOrder(response)

        yield put(setStatuses(StatusObj))
        yield put(setColumnOrder(columnOrderArr))
    } catch (e) {
        yield put(setGlobalErrorMessage(e.response?.data))
    } 
}

export function* handlePostStatus(action) {
    const {name, priority} = action.payload
    yield put(setQueryLoading(true))
    try {
        const response = yield call(postStatusService, 0, name, Number(priority))
        const data = {...action.payload, ...response.data}
        yield put(addStatus(data))
        yield put (setQueryFlag(true))
    } catch (e) {
        yield put(setErrorInfo(e.response?.data?.errorInfo))
    } finally {
        yield put(setQueryLoading(false))
    }
}

export function* handleDeleteStatus(action) {
    const { column } = action.payload
    console.log(action.payload)
    try {
        const response = yield call(deleteStatusService, column.id)
        yield put(deleteStatus(action.payload))
    } catch (e) {
        console.log(e.response?.data?.message);
    } 
}

export function* statusSaga() {
    yield takeEvery('dnd/addStatusQuery', handlePostStatus);
    yield takeEvery('dnd/deleteStatusQuery', handleDeleteStatus);
}