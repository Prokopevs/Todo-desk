import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import AuthService from "../../services/AuthService";
import { checkAuthService, setSettingsService } from '../../services/CheckAuthService';
import { setAuth, setLoading, setSettings, setUser } from '../reducers/authorizationSlice';
import { setQueryFlag } from '../reducers/dndSlice';
import { setQueryLoading } from '../reducers/editModeSlice';
import { setErrorInfo, setGlobalErrorMessage } from '../reducers/errorMessageSlice';
import { handleGetStatus } from './statusSaga';
import { handleGetTask } from './taskSaga';

export function* handleData() {
    yield all([
        fork(handleGetStatus),
        fork(handleGetTask)
    ])
}

export function* handleLogin(action) {
    const { email, password, rememberMe } = action.payload
    try {
        const response = yield call(() => AuthService.login(email, password))
        localStorage.setItem('token', response.data.accessToken)
        localStorage.setItem('rememberMe', rememberMe)
        sessionStorage.setItem('checkReboot', "true")
        yield handleCheckAuth()
    } catch (e) {
        yield put(setErrorInfo(e.response?.data?.errorInfo || e.message))
    }
}

export function* handleRegistration(action) {
    const { email, name, password } = action.payload
    try {
        const response = yield call(() => AuthService.registration(email, name, password))
        localStorage.setItem('token', response.data.accessToken)
        sessionStorage.setItem('checkReboot', "true")
        yield handleCheckAuth()
    } catch (e) {
        yield put(setErrorInfo(e.response?.data?.errorInfo || e.message))
    }
}

export function* handleCheckAuth() {
    yield put(setLoading(true))
    try {
        const response = yield call(checkAuthService)
        yield put(setUser(response.data))
        yield put(setAuth(true))
        yield handleData()
        // const data = JSON.stringify(["96"])
        // localStorage.setItem("40", data)
        // localStorage.removeItem("51")
    } catch (e) {
        yield put(setAuth(false))
    } finally {
        yield put(setLoading(false))
    }
}

export function* handleSettings(action) {
    console.log(action.payload)
    // yield put(setQueryLoading(true))
    // try {
    //     const response = yield call(setSettingsService, action.payload)
    //     yield put(setSettings(action.payload))
    //     yield put (setQueryFlag(true))
    // } catch (e) {
    //     yield put(setErrorInfo(e.response?.data?.errorInfo))
    // } finally {
    //     yield put(setQueryLoading(false))
    // }
}

export function* authSaga() {
    yield takeEvery('authorization/checkAuth', handleCheckAuth);
    yield takeEvery('authorization/login', handleLogin);
    yield takeEvery('authorization/registration', handleRegistration);
    yield takeEvery('authorization/setSettingsQuery', handleSettings);
}