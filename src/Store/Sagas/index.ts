import { fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { statusSaga } from './statusSaga';
import { taskSaga } from './taskSaga';

export default function* rootSaga() {
    yield fork(authSaga);
    yield fork(statusSaga);
    yield fork(taskSaga);
}