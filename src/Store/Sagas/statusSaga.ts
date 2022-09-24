import { selectEditMode } from './../selectors/index';
import { mapResponseStatus } from './sagaHelpers/status/mapResponseStatus';
import { mapColumnOrder } from './sagaHelpers/status/mapColumnOrder';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { changeNameStatusService, deleteStatusService, getStatusService, postStatusService } from '../../services/StatusService';
import { addStatus, changeStatusName, deleteStatus, setColumnOrder, setQueryFlag, setStatuses } from '../reducers/dnd/slice';
import { addItemInEditStatus, setQueryLoading } from '../reducers/editMode/slice';
import { deleteErrorStatusInfo, setErrorInfo, setErrorStatusName, setErrorStatusInfo, setGlobalErrorMessage, deleteErrorStatusName } from '../reducers/errorMessage/slice';
import { IAddStatus, IChangeStatus, IDeleteStatus } from '../reducers/dnd/types';

export function* handleGetStatus() {
    try {
        const response = yield call(getStatusService)
        const arr = JSON.parse(JSON.stringify(response.data))
        const { tasksFromBC } = yield select(selectEditMode)
        const StatusObj = mapResponseStatus(arr, tasksFromBC)
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
    const {name, parentId}: IAddStatus = action.payload
    yield put(setQueryLoading(true))
    try {
        const response = yield call(postStatusService, 0, name, parentId)
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
    const { column }: IDeleteStatus = action.payload
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
    const { id, name }:IChangeStatus = action.payload
    try {
        const response = yield call(changeNameStatusService, Number(id), name)
        yield put(changeStatusName(action.payload))
        yield put(addItemInEditStatus(id))
        yield put(deleteErrorStatusName(id))
    } catch (e) {
        const data = {id: id, message: e.response?.data?.errorInfo || e.message}
        yield put(setErrorStatusName(data))
    } 
}

export function* statusSaga() {
    yield takeEvery('dnd/addStatusQuery', handlePostStatus);
    yield takeEvery('dnd/deleteStatusQuery', handleDeleteStatus);
    yield takeEvery('dnd/changeStatusNameQuery', handleChangeName);
}