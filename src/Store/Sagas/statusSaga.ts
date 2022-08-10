import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { getStatusService, postStatusService } from '../../services/StatusService';
import { setStatus } from '../reducers/dndSlice';

export function* handleGetStatus() {
    try {
        const response = yield call(getStatusService)
        yield put(setStatus(response.data))
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export function* handlePostStatus(id, name, priority) {
    try {
        const response = yield call(postStatusService, id, name, priority)
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}