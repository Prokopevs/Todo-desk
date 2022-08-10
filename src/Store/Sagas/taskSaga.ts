import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { getTaskService, postTaskService } from '../../services/TaskService';
import { setTask } from '../reducers/dndSlice';

export function* handleGetTask() {
    try {
        const response = yield call(getTaskService)
        yield put(setTask(response.data))
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export function* handlePostTask(id, name, priority) {
    try {
        const response = yield call(postTaskService, id, name, priority)
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}