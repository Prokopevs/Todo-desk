import { mapResponseStatus } from './sagaHelpers/status/mapResponseStatus';
import { mapColumnOrder } from './sagaHelpers/status/mapColumnOrder';
import { takeEvery, put, call } from 'redux-saga/effects';
import { changeNameStatusService, deleteStatusService, getStatusService, postStatusService } from '../../services/StatusService';
import { addStatus, changeStatusName, deleteStatus, setColumnOrder, setQueryFlag, setStatuses } from '../reducers/dndSlice';
import { setQueryLoading } from '../reducers/editModeSlice';
import { setErrorInfo, setErrorInfoStatus, setGlobalErrorMessage } from '../reducers/errorMessageSlice';

export function* handleGetStatus() {
    try {
        const response = yield call(getStatusService)
        const arr = JSON.parse(JSON.stringify(response.data))
        const StatusObj = mapResponseStatus(arr)
        const columnOrderArr = mapColumnOrder(response)

        yield put(setStatuses(StatusObj))
        yield put(setColumnOrder(columnOrderArr))
    } catch (e) {
        const errorObj = {
            status: e.response?.status,
            statusText: e.response?.statusText
        }
        yield put(setGlobalErrorMessage(errorObj))
    } 
}

export function* handlePostStatus(action) {
    const {name, parentId} = action.payload
    console.log(parentId)
    yield put(setQueryLoading(true))
    try {
        const response = yield call(postStatusService, 0, name, parentId)
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
    console.log(column.id)
    try {
        const response = yield call(deleteStatusService, column.id)
        yield put(deleteStatus(action.payload))
    } catch (e) {
        console.log(e.response?.data?.message);
    } 
}

export function* handleChangeName(action) {
    const { id, name } = action.payload
    console.log(action.payload)
    try {
        const response = yield call(changeNameStatusService, Number(id), name)
        yield put (changeStatusName(action.payload))
        yield put (setQueryFlag(true))
    } catch (e) {
        yield put(setErrorInfoStatus(e.response?.data?.errorInfo))
    } 
}

export function* statusSaga() {
    yield takeEvery('dnd/addStatusQuery', handlePostStatus);
    yield takeEvery('dnd/deleteStatusQuery', handleDeleteStatus);
    yield takeEvery('dnd/changeStatusNameQuery', handleChangeName);
}