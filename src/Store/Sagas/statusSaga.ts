import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { getStatusService, postStatusService } from '../../services/StatusService';
import { addStatus, setColumnOrder, setStatuses } from '../reducers/dndSlice';

export function* handleGetStatus() {
    try {
        const response = yield call(getStatusService)
        const arr = JSON.parse(JSON.stringify(response.data))

        let StatusObj = {};
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] !== undefined) {
                StatusObj[arr[i].id] = arr[i]; // "3" = {id: 3, name: 'Progress2', priority: 1}
                delete StatusObj[arr[i].id]["priority"] // "3" = {id: 3, name: 'Progress2'}
                StatusObj[arr[i].id].id = String(StatusObj[arr[i].id].id) // "3" = {id: '3', name: 'Progress2'}

                let taskIdsNumbers = localStorage.getItem(`${arr[i].id}`) // "1,2"
                console.log(taskIdsNumbers)
                let taskIdsArr
                if(taskIdsNumbers) {
                    taskIdsArr = taskIdsNumbers.split(',') //["1","2"]
                }    
                StatusObj[arr[i].id]["taskIds"] = taskIdsNumbers ? taskIdsArr : [] //"3" = {id: '3', name: 'Progress2', taskIds:["1","2"]}
            }
        }
        const columnOrderArr = response.data.map(item => `${item.id}`) // [ '3', '1', '2' ]

        yield put(setStatuses(StatusObj))
        yield put(setColumnOrder(columnOrderArr))
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export function* handlePostStatus(action) {
    const {name, priority} = action.payload
    try {
        const response = yield call(postStatusService, 0, name, Number(priority))
        const data = {...action.payload, ...response.data}
        yield put(addStatus(data))
    } catch (e) {
        console.log(e.response?.data?.message);
    }
}

export function* statusSaga() {
    yield takeEvery('dnd/addStatusQuery', handlePostStatus);
}