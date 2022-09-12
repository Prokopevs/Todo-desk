import { selectEditMode } from './../selectors/index';
import { mapResponseStatus } from './sagaHelpers/status/mapResponseStatus';
import { mapColumnOrder } from './sagaHelpers/status/mapColumnOrder';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { changeNameStatusService, deleteStatusService, getStatusService, postStatusService } from '../../services/StatusService';
import { addStatus, changeStatusName, deleteStatus, setColumnOrder, setQueryFlag, setStatuses } from '../reducers/dndSlice';
import { setQueryLoading } from '../reducers/editModeSlice';
import { deleteErrorStatusInfo, setErrorInfo, setErrorInfoStatus, setErrorStatusInfo, setGlobalErrorMessage } from '../reducers/errorMessageSlice';

export function* handleGetStatus() {
    try {
        const response = yield call(getStatusService)
        const arr = JSON.parse(JSON.stringify(response.data))
        const { tasksInLS } = yield select(selectEditMode)
        const StatusObj = mapResponseStatus(arr, tasksInLS)
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
    yield put(setQueryLoading(true))
    try {
        const response = yield call(postStatusService, 0, name, Number(parentId))
        const data = {...action.payload, ...response.data}
        yield put(addStatus(data))
        yield put (setQueryFlag(true))
    } catch (e) {
        yield put(setErrorInfo(e.response?.data?.errorInfo || e.message))
    } finally {
        yield put(setQueryLoading(false))
    }
}

export function* handleDeleteStatus(action) {
    const { column } = action.payload
    try {
        const response = yield call(deleteStatusService, column.id)
        yield put(deleteStatus(action.payload))
        yield put(deleteErrorStatusInfo(column.id))
    } catch (e) {
        const data = {id: column.id, message: e.response?.data?.errorInfo || e.message}
        yield put(setErrorStatusInfo(data))
    } 
}

export function* handleChangeName(action) {
    const { id, name } = action.payload
    try {
        const response = yield call(changeNameStatusService, Number(id), name)
        yield put (changeStatusName(action.payload))
        yield put (setQueryFlag(true))
    } catch (e) {
        yield put(setErrorInfoStatus(e.response?.data?.errorInfo || e.message))
    } 
}

export function* statusSaga() {
    yield takeEvery('dnd/addStatusQuery', handlePostStatus);
    yield takeEvery('dnd/deleteStatusQuery', handleDeleteStatus);
    yield takeEvery('dnd/changeStatusNameQuery', handleChangeName);
}