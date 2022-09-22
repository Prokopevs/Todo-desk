import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import AuthService from "../../services/AuthService";
import { checkAuthService, setSettingsService } from '../../services/CheckAuthService';
import { setAuth, setLoading, setSettings, setUser } from '../reducers/authorization/slice';
import { ILogin, IRegistration } from '../reducers/authorization/types';
import { setQueryFlag } from '../reducers/dnd/slice';
import { setQueryLoading } from '../reducers/editMode/slice';
import { setErrorInfo, setGlobalErrorMessage } from '../reducers/errorMessage/slice';
import { handleGetStatus } from './statusSaga';
import { handleGetTask } from './taskSaga';

export function* handleData() {
    yield call(handleGetTask) 
    yield call(handleGetStatus)
}

export function* handleLogin(action) {
    const { email, password, rememberMe }: ILogin = action.payload
    try {
        const response = yield call(() => AuthService.login(email, password))
        localStorage.setItem('token', response.data.accessToken)
        localStorage.setItem('rememberMe', JSON.stringify(rememberMe))
        sessionStorage.setItem('checkReboot', "true")
        yield handleCheckAuth()
    } catch (e) {
        yield put(setErrorInfo(e.response?.data?.errorInfo || e.message))
    }
}

export function* handleRegistration(action) {
    const { email, name, password }: IRegistration = action.payload
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
    } catch (e) {
        yield put(setAuth(false))
    } finally {
        yield put(setLoading(false))
    }
}

export function* handleSettings(action) {
    yield put(setQueryLoading(true))
    try {
        const response = yield call(setSettingsService, action.payload)
        yield put(setSettings(action.payload))
        yield put (setQueryFlag(true))
    } catch (e) {
        yield put(setErrorInfo(e.response?.data?.errorInfo || e.message))
    } finally {
        yield put(setQueryLoading(false))
    }
}

export function* authSaga() {
    yield takeEvery('authorization/checkAuth', handleCheckAuth);
    yield takeEvery('authorization/login', handleLogin);
    yield takeEvery('authorization/registration', handleRegistration);
    yield takeEvery('authorization/setSettingsQuery', handleSettings);
}