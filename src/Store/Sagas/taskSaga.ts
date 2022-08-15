import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { deleteTaskService, getTaskService, postTaskService, putTaskService } from '../../services/TaskService';
import { addTask, changeTaskContent, deleteTask, setQueryFlag, setTasks } from '../reducers/dndSlice';
import { setQueryLoading, setDeleteClick } from '../reducers/editModeSlice';

export function* handleGetTask() {
    try {
        const response = yield call(getTaskService)
        const arr = JSON.parse(JSON.stringify(response.data))

        let taskObj = {};
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] !== undefined) {
            taskObj[arr[i].id] = arr[i]; // '2' = {id: 2, content: 'do something ', priority: 3, status_id: 6}
            // delete taskObj[arr[i].id]["status_id"] // '2' = {id: 2, content: 'do something', priority: 3}
            taskObj[arr[i].id].id = String(taskObj[arr[i].id].id) // '2' = {id: 2, content: 'do something', priority: 3}
            taskObj[arr[i].id]["isOpen"] = false // '2' = {id: 2, content: 'do something', priority: 3, isOpen: false}
            }
        }
        yield put(setTasks(taskObj))
    } catch (e) {
        console.log(e.response?.data?.message);
    } 
}

export function* handlePostTask(action) {
    const { content, priority, status_id } = action.payload
    yield put(setQueryLoading(true))
    try {
        const response = yield call(postTaskService, 0, content, priority, 3)
        const data = {...action.payload, ...response.data}
        yield put(addTask(data))
        yield put (setQueryFlag(true))
    } catch (e) {
        console.log(e.response?.data?.message);
    } finally {
        yield put(setQueryLoading(false))
    }
}

export function* handlePutTask(action) {
    const { text, id, priority, status_id } = action.payload
    console.log(action.payload)
    yield put(setQueryLoading(true))
    try {
        const response = yield call(putTaskService, text, Number(id), priority, Number(status_id))
        yield put(changeTaskContent(action.payload))
        yield put (setQueryFlag(true))
    } catch (e) {
        console.log(e.response?.data?.message);
    } finally {
        yield put(setQueryLoading(false))
    }
}

export function* handleDeleteTask(action) {
    const { id } = action.payload
    try {
        const response = yield call(deleteTaskService, id)
        yield put(deleteTask(action.payload))
    } catch (e) {
        console.log(e.response?.data?.message);
    } finally {
        yield put(setDeleteClick(false))
    } 
}

export function* taskSaga() {
    yield takeEvery('dnd/addTaskQuery', handlePostTask);
    yield takeEvery('dnd/changeTaskContentQuery', handlePutTask);
    yield takeEvery('dnd/deleteTaskQuery', handleDeleteTask);
}