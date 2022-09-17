import { takeEvery, put, call, select } from 'redux-saga/effects';
import { deleteTaskService, getTaskService, postTaskService, putTaskService } from '../../services/TaskService';
import { addTask, changeTaskContent, deleteTask, reorderTaskInStorage, setQueryFlag, setTasks } from '../reducers/dnd/slice';
import { setQueryLoading, setPrevTaskObj, changePrevTaskObj, setOpacityButtons, removeOpacityButtons, deleteTaskInEditArray, addTaskInSuccessArray, addTaskInPrevTaskObj, deleteTaskInPrevTaskObj, setTasksInLS } from '../reducers/editMode/slice';
import { deleteErrorTaskInfo, setErrorInfo, setErrorTaskInfo, setGlobalErrorMessage } from '../reducers/errorMessage/slice';
import { mapResponseTasks } from './sagaHelpers/task/mapResponseTasks';
import { mapResponsePrevTasks} from './sagaHelpers/task/mapResponsePrevTasks';
import { IAddTask, IChangeTaskContent, IDeleteTask } from '../reducers/dnd/types';

export function* handleGetTask() {
    try {
        const response = yield call(getTaskService)
        const arr = JSON.parse(JSON.stringify(response.data))
        const tasks = mapResponseTasks(arr)
        const prevTaskObj = mapResponsePrevTasks(response.data)
        yield put(setTasks(tasks[0]))
        yield put(setPrevTaskObj(prevTaskObj))
        yield put(setTasksInLS(tasks[1]))
    } catch (e) {
        const errorObj = {
            status: e.response?.status,
            statusText: e.response?.statusText
        }
        yield put(setGlobalErrorMessage(errorObj))
    } 
}

export function* handlePostTask(action) {
    const { content, priority, status_id }: IAddTask = action.payload
    yield put(setQueryLoading(true))
    try {
        const response = yield call(postTaskService, content, 0, priority, Number(status_id))
        const data = {...action.payload, ...response.data}
        yield put(addTask(data))
        yield put(setQueryFlag(true))
        yield put(addTaskInPrevTaskObj(data))
    } catch (e) {
        yield put(setErrorInfo(e.response?.data?.errorInfo || e.message ))
    } finally {
        yield put(setQueryLoading(false))
    }
}

export function* handlePutTask(action) {
    const { content, id, priority, status_id }: IChangeTaskContent = action.payload
    const obj = { arrName: "apply", id: id }
    yield put(setOpacityButtons(obj))
    try {
        const response = yield call(putTaskService, content, Number(id), priority, Number(status_id))
        yield put(changeTaskContent(action.payload))
        yield put(addTaskInSuccessArray(id))
        yield put(changePrevTaskObj(action.payload))
        yield put(deleteErrorTaskInfo(id))
    } catch (e) {
        const data = {id: id, message: e.response?.data?.errorInfo || e.message}
        yield put(setErrorTaskInfo(data))
    } finally {
        yield put(removeOpacityButtons(obj))
    }
}

export function* handleReorderTask() {
    const state = yield select((state) => state.dndSlice)
    const id = state.start.taskIds[state.result.source.index]
    const status_id = state.finish.id
    const { content, priority } = state.data.tasks[id]
    try {
        const response = yield call(putTaskService, content, Number(id), priority, Number(status_id))
        yield put(reorderTaskInStorage())
    } catch (e) {
        const data = {id: id, message: e.response?.data?.errorInfo || e.message}
        yield put(setErrorTaskInfo(data))
    } 
}

export function* handleDeleteTask(action) {
    const { id }: IDeleteTask = action.payload
    const obj = { arrName: "delete", id: id }
    yield put(setOpacityButtons(obj))
    try {
        const response = yield call(deleteTaskService, id)
        yield put(deleteTask(action.payload))
        yield put(deleteTaskInEditArray(id))
        yield put(deleteTaskInPrevTaskObj(id))
        yield put(deleteErrorTaskInfo(id))
    } catch (e) {
        const data = {id: id, message: e.response?.data?.errorInfo || e.message}
        yield put(setErrorTaskInfo(data))
    } finally {
        yield put(removeOpacityButtons(obj))
    } 
}

export function* taskSaga() {
    yield takeEvery('dnd/addTaskQuery', handlePostTask);
    yield takeEvery('dnd/changeTaskContentQuery', handlePutTask);
    yield takeEvery('dnd/deleteTaskQuery', handleDeleteTask);
    yield takeEvery('dnd/reorderTaskInDifferentStatus', handleReorderTask);

}