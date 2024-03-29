import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialData from "../../../components/Desk/initial-data";
import { IAddStatus, IAddTask, IChangeStatus, IChangeTaskContent, IColumn, IColumns, 
        IDeleteStatus, IDeleteTask, IPriority, IResult, IStatusObj, ITasks, ITasksObj } from './types';
interface DndState {
    data: {
        tasks: ITasks,
        columns: IColumns,
        columnOrder: string[]
    },
    result: IResult,
    start: IColumn,
    finish: IColumn
    activePen: boolean
    lineArrays: {
        firstArray: number[]
        secondArray: number[]
    }
    queryFlag: boolean
    parentId: number | null
}
  
const initialState: DndState = {
    data: initialData,
    result: {
        destination: {
            droppableId: "",
            index: null
        },
        source: {
            index: null, 
            droppableId: ""
        },
        draggableId: "",
    },
    start: {
        id: "",
        name: "",
        taskIds: [],
    },
    finish: {
        id: "",
        name: "",
        taskIds: [],
    },
    activePen: false,
    lineArrays: {
        firstArray: [],
        secondArray: [],
    },
    queryFlag: false,
    parentId: null 
}


export const dndSlice = createSlice({
    name: 'dnd',
    initialState,
    reducers: {
        setStatuses: (state, action: PayloadAction<IStatusObj>) => {
            state.data.columns = action.payload
        },
        setColumnOrder: (state, action: PayloadAction<string[]>) => {
            state.data.columnOrder = action.payload
        },
        setTasks: (state, action: PayloadAction<ITasksObj>) => {
            state.data.tasks = action.payload
        },
        setResult: (state, action: PayloadAction<IResult>) => {
            state.result.destination = action.payload.destination
            state.result.source = action.payload.source
            state.result.draggableId = action.payload.draggableId
        },
        setStart: (state, action: PayloadAction<IColumn>) => {
            state.start = action.payload
        },
        setFinish: (state, action: PayloadAction<IColumn>) => {
            state.finish = action.payload
        },
        reorderTaskInOwnStatus: (state, action: PayloadAction<boolean | null>) => {
            const newTaskIds = Array.from(state.start.taskIds) // получили массив с тасками taskIds: ["0", "1"]
            newTaskIds.splice(state.result.source.index!, 1) // удалили элемент, который тянули
            newTaskIds.splice(state.result.destination.index!, 0, state.result.draggableId) // вставили этот элемент в новое место

            const Status = state.data.columns[state.start.id] // Status (столбец где произошло изменение) 
            Status.taskIds = newTaskIds // заменили старый массив на новый 
            // -------------------------- //
            if(action.payload) {
                let taskIdsNumbers = localStorage.getItem(`${state.start.id}`) // "["1,2"]"
                let taskIdsArr = JSON.parse(taskIdsNumbers!) //["1","2"]
                    
                taskIdsArr.splice(state.result.source.index!, 1) //["2"]
                taskIdsArr.splice(state.result.destination.index!, 0, state.result.draggableId) //["2","1"]
                localStorage.setItem(`${state.start.id}`, JSON.stringify(taskIdsArr))
            }
        },
        reorderTaskInDifferentStatus: (state) => {
            const startTaskIds = Array.from(state.start.taskIds) // массив с тасками в стартовом статусе taskIds: ["0", "1"]
            startTaskIds.splice(state.result.source.index!, 1) // удалили элемент, который тянули
            
            const finishTaskIds = Array.from(state.finish.taskIds) // массив с тасками в конечном статусе taskIds: ["0", "1"]
            finishTaskIds.splice(state.result.destination.index!, 0, state.result.draggableId) // вставили элемент в новое место

            const startStatus = state.data.columns[state.start.id] // Status (столбец откуда взяли таску)
            const finishStatus = state.data.columns[state.finish.id] // Status (столбец куда вставили таску)
            startStatus.taskIds = startTaskIds // заменили старый массив на новый 
            finishStatus.taskIds = finishTaskIds // заменили старый массив на новый 
        },
        reorderTaskInStorage: (state) => {
            let startTaskIdsNumbers = localStorage.getItem(`${state.start.id}`) // "["1,2"]"
            let startTaskIdsArr = JSON.parse(startTaskIdsNumbers!) //["1","2"]
            startTaskIdsArr.splice(state.result.source.index!, 1) // удалили элемент, который тянули в LS
            if (startTaskIdsArr.length === 0) {
                localStorage.removeItem(`${state.start.id}`)
            } else {
                localStorage.setItem(`${state.start.id}`, JSON.stringify(startTaskIdsArr))
            }

            let finishTaskIdsNumbers = localStorage.getItem(`${state.finish.id}`) // "["1,2"]"
            let finishTaskIdsArr = finishTaskIdsNumbers ? JSON.parse(finishTaskIdsNumbers) : []
            finishTaskIdsArr.splice(state.result.destination.index!, 0, state.result.draggableId) // вставили элемент в новое место
            localStorage.setItem(`${state.finish.id}`, JSON.stringify(finishTaskIdsArr))
        },
        setOpenPriorityСolumn: (state, action: PayloadAction<string>) => {
            const task = state.data.tasks[action.payload]
            task.isOpen = !task.isOpen
        },
        onChangePriority: (state, action: PayloadAction<IPriority>) => {
            const task = state.data.tasks[action.payload.id]
            task.priority = action.payload.index
        },
        deleteTaskQuery: (state, action: PayloadAction<IDeleteTask>) => {},
        deleteTask: (state, action: PayloadAction<IDeleteTask>) => { 
            const deleteArr = state.data.columns[action.payload.column.id].taskIds // массив где произойдёт удаление таски
            const index = deleteArr.indexOf(action.payload.id) // индекс удаляемого элемента в массиве
            deleteArr.splice(index, 1) 
            delete state.data.tasks[action.payload.id] 

            if (action.payload.isAuth) {
                let stringArr = localStorage.getItem(`${action.payload.column.id}`) // "["1,2"]"
                let deleteArr = JSON.parse(stringArr!) // ["1","2"]
                const index = deleteArr.indexOf(action.payload.id) // индекс удаляемого элемента в массиве
                deleteArr.splice(index, 1)
                if(deleteArr.length == 0) {
                    localStorage.removeItem(`${action.payload.column.id}`)
                } else {
                    localStorage.setItem(`${action.payload.column.id}`, JSON.stringify(deleteArr))
                }
            }
        },
        deleteStatusQuery: (state, action: PayloadAction<IDeleteStatus>) => {},
        deleteStatus: (state, action: PayloadAction<IDeleteStatus>) => { 
            if (action.payload.isAuth) {
                let stringArr = localStorage.getItem(`${action.payload.column.id}`) // "["1,2"]"
                if(stringArr) {
                    localStorage.removeItem(`${action.payload.column.id}`)
                }
            } else {  
                const taskIdsArr = state.data.columns[action.payload.column.id].taskIds
                for(let i=0; i<taskIdsArr.length; i++) {
                    delete state.data.tasks[taskIdsArr[i]]
                }
            }
            state.data.columnOrder.splice(state.data.columnOrder.indexOf(action.payload.column.id), 1)
            delete state.data.columns[action.payload.column.id]
        },
        addTaskQuery: (state, action: PayloadAction<IAddTask>) => {},
        addTask: (state, action: PayloadAction<IAddTask>) => {
            if(action.payload.isAuth) {
                const { content, priority, status_id, id } = action.payload
                const newTaskValue = { 
                    id: String(id),
                    content: content, 
                    priority: priority, 
                    isOpen: false 
                }
                state.data.tasks[`${id}`] = newTaskValue
                state.data.columns[`${status_id}`].taskIds.push(String(id))

                let taskIdsArr = localStorage.getItem(`${status_id}`)
                const parsedTaskIdsArr = taskIdsArr ? JSON.parse(taskIdsArr) : []
                parsedTaskIdsArr.splice(parsedTaskIdsArr.length, 0, String(id))
                const data = JSON.stringify(parsedTaskIdsArr)
                localStorage.setItem(`${status_id}`, data)
            } else {
                const newTaskKey = Number(Object.keys(state.data.tasks)[Object.keys(state.data.tasks).length - 1]) + 1
                const newTaskValue = { 
                    id: String(newTaskKey),
                    content: action.payload.content, 
                    priority: action.payload.priority, 
                    isOpen: false 
                }
                state.data.tasks[newTaskKey] = newTaskValue
                state.data.columns[`${action.payload.status_id}`].taskIds.push(String(newTaskKey))
            }
        },
        addStatusQuery: (state, action: PayloadAction<IAddStatus>) => {},
        addStatus: (state, action: PayloadAction<IAddStatus>) => {
            if (action.payload.isAuth) {
                const {id, name, parentId} = action.payload
                const newColumnValue = {
                    id: String(id), //4
                    name: name,
                    taskIds: [],
                }
                state.data.columns[`${id}`] = newColumnValue // добавили а объект новое свойство
                const startIndex= state.data.columnOrder.indexOf(String(parentId))
                state.data.columnOrder.splice(startIndex + 1, 0, `${id}`)
            } else {
                const arrOfNumbers = state.data.columnOrder.map(item => Number(item)) // [1, 2, 3]
                let newIndexToColumn = arrOfNumbers.length === 0 ? 1 : Math.max( ...arrOfNumbers ) + 1
                const newColumnValue = {
                    id: String(newIndexToColumn), //"4"
                    name: action.payload.name,
                    taskIds: [],
                    }
                state.data.columns[String(newIndexToColumn)] = newColumnValue // добавили в объект новое свойство
                const startIndex= state.data.columnOrder.indexOf(String(action.payload.parentId))
                state.data.columnOrder.splice(startIndex + 1, 0, String(newIndexToColumn))
            }
        },
        changeStatusNameQuery: (state, action: PayloadAction<IChangeStatus>) => {},
        changeStatusName: (state, action: PayloadAction<IChangeStatus>) => { 
            const {id, name} = action.payload
            state.data.columns[id].name = name
        },
        changeTaskContentQuery: (state, action: PayloadAction<IChangeTaskContent>) => {},
        changeTaskContent: (state, action: PayloadAction<IChangeTaskContent>) => {
            state.data.tasks[action.payload.id].content = action.payload.content
        },
        setInitialData: (state) => {
            state.data = initialData
        },
        setLineArray: (state, action: PayloadAction<number>) => {
            let arr: number[] = []
            for(let i=1; i<=action.payload; i++) {
                arr.push(3*i-1)
            }
            state.lineArrays["firstArray"] = arr
            state.lineArrays["secondArray"] = arr.map((item) => item + 1)
        },
        setQueryFlag: (state, action: PayloadAction<boolean>) => {
            state.queryFlag = action.payload
        }, 
        setParentId: (state, action: PayloadAction<number>) => {
            state.parentId = action.payload
        }, 
    }
})


export const { setStatuses, setColumnOrder, setResult, setTasks, setStart, setFinish, reorderTaskInOwnStatus, reorderTaskInDifferentStatus, setOpenPriorityСolumn, onChangePriority, deleteTask, deleteTaskQuery, addTask, addTaskQuery, addStatus, changeTaskContent, changeTaskContentQuery, deleteStatus, deleteStatusQuery, setLineArray, addStatusQuery, setInitialData, setQueryFlag, setParentId, changeStatusNameQuery, changeStatusName, reorderTaskInStorage } = dndSlice.actions

export default dndSlice.reducer