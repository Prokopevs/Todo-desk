import { useNavigate } from 'react-router-dom';
import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { deleteTaskService, getTaskService, postTaskService, putTaskService } from '../../services/TaskService';
import { addTask, changeTaskContent, deleteTask, setQueryFlag, setTasks } from '../reducers/dndSlice';
import { setQueryLoading, setPrevTaskObj, changePrevTaskObj, setOpasityButtons, removeOpasityButtons, deleteTaskInEditArray, addTaskInSuccessArray, addTaskInPrevTaskObj, deleteTaskInPrevTaskObj } from '../reducers/editModeSlice';
import { deleteErrorTaskInfo, setErrorInfo, setErrorTaskInfo, setGlobalErrorMessage } from '../reducers/errorMessageSlice';
import { mapResponsePrevTasks, mapResponseTasks } from './sagaHelpers/taskHelper';

export function* handleGetTask() {
    try {
        const response = yield call(getTaskService)
        const arr = JSON.parse(JSON.stringify(response.data))
        const taskObj = mapResponseTasks(arr)
        const prevTaskObj = mapResponsePrevTasks(response.data)
        yield put(setTasks(taskObj))
        yield put(setPrevTaskObj(prevTaskObj))
    } catch (e) {
        yield put(setGlobalErrorMessage(e.response?.data))
    } 
}

export function* handlePostTask(action) {
    const { content, priority, status_id } = action.payload
    console.log(status_id)
    yield put(setQueryLoading(true))
    try {
        const response = yield call(postTaskService, 0, content, priority, 3)
        const data = {...action.payload, ...response.data}
        yield put(addTask(data))
        yield put(setQueryFlag(true))
        yield put(addTaskInPrevTaskObj(data))
    } catch (e) {
        yield put(setErrorInfo(e.response?.data?.errorInfo))
    } finally {
        yield put(setQueryLoading(false))
    }
}

export function* handlePutTask(action) {
    const { content, id, priority, status_id } = action.payload
    const obj = { arrName: "apply", id: id }
    yield put(setOpasityButtons(obj))
    try {
        const response = yield call(putTaskService, content, Number(id), priority, Number(status_id))
        yield put(changeTaskContent(action.payload))
        yield put(addTaskInSuccessArray(id))
        yield put(changePrevTaskObj(action.payload))
        yield put(deleteErrorTaskInfo(id))
    } catch (e) {
        const data = {id: id, message: e.response?.data?.errorInfo}
        yield put(setErrorTaskInfo(data))
    } finally {
        yield put(removeOpasityButtons(obj))
    }
}

export function* handleDeleteTask(action) {
    const { id } = action.payload
    const obj = { arrName: "delete", id: id }
    yield put(setOpasityButtons(obj))
    try {
        const response = yield call(deleteTaskService, id)
        yield put(deleteTask(action.payload))
        yield put(deleteTaskInEditArray(id))
        yield put(deleteTaskInPrevTaskObj(id))
    } catch (e) {
        console.log(e.response?.data?.message)
    } finally {
        yield put(removeOpasityButtons(obj))
    } 
}

export function* taskSaga() {
    yield takeEvery('dnd/addTaskQuery', handlePostTask);
    yield takeEvery('dnd/changeTaskContentQuery', handlePutTask);
    yield takeEvery('dnd/deleteTaskQuery', handleDeleteTask);
}