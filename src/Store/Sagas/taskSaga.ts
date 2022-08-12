import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { getTaskService, postTaskService } from '../../services/TaskService';
import { addTask, setTasks } from '../reducers/dndSlice';

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
    try {
        const response = yield call(postTaskService, 0, content, priority, 3)
        const data = {...action.payload, ...response.data}
        yield put(addTask(data))
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export function* taskSaga() {
    yield takeEvery('dnd/addTaskQuery', handlePostTask);
}