import { IPriority } from './../../models/dnd/IPriority';
import { IColumn } from './../../models/dnd/IData';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialData from "../../components/Desk/initial-data";
import { IColumns, ITasks } from "../../models/dnd/IData";
import { IAddTask } from './../../models/IAddTask';
import { IResult } from "../../models/dnd/IResult";
import { IDeleteTask } from '../../models/dnd/IDeleteTask';
import { IAddStatus } from '../../models/IAddStatus';
import { IChangeTaskContent } from '../../models/dnd/IChangeTaskContent';
import { IStatusObj } from '../../models/Status/IStatusObj';
import { stringify } from 'querystring';
import { ITasksObj } from '../../models/Task/ITasksObj';
interface DndState {
    data: {
        tasks: ITasks,
        columns: IColumns,
        columnOrder: string[]
    },
    result: IResult,
    start: IColumn,
    finish: IColumn
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
        reorderTaskInOwnStatus: (state, action: PayloadAction<boolean>) => {
            const newTaskIds = Array.from(state.start.taskIds) // получили массив с тасками taskIds: ["0", "1"]
            newTaskIds.splice(state.result.source.index!, 1) // удалили элемент, который тянули
            newTaskIds.splice(state.result.destination.index!, 0, state.result.draggableId) // вставили этот элемент в новое место

            const Status = state.data.columns[state.start.id] // Status (столбец где произошло изменение) 
            Status.taskIds = newTaskIds // заменили старый массив на новый 

            // -------------------------- //
            if(action.payload) {
                let taskIdsNumbers = localStorage.getItem(`${state.start.id}`) // "1,2"
                let taskIdsArr = taskIdsNumbers.split(',') //["1","2"]
                    
                taskIdsArr.splice(state.result.source.index!, 1) //["2"]
                taskIdsArr.splice(state.result.destination.index!, 0, state.result.draggableId) //["2","1"]
                localStorage.setItem(`${state.start.id}`, `${taskIdsArr.join(",")}`)
        }
        },
        reorderTaskInDifferentStatus: (state, action: PayloadAction<boolean>) => {
            const startTaskIds = Array.from(state.start.taskIds) // массив с тасками в стартовом статусе taskIds: ["0", "1"]
            startTaskIds.splice(state.result.source.index!, 1) // // удалили элемент, который тянули

            const finishTaskIds = Array.from(state.finish.taskIds) // массив с тасками в конечном статусе taskIds: ["0", "1"]
            finishTaskIds.splice(state.result.destination.index!, 0, state.result.draggableId) // вставили элемент в новое место

            const startStatus = state.data.columns[state.start.id] // Status (столбец откуда взяли таску)
            const finishStatus = state.data.columns[state.finish.id] // Status (столбец куда вставили таску)
            startStatus.taskIds = startTaskIds // заменили старый массив на новый 
            finishStatus.taskIds = finishTaskIds // заменили старый массив на новый 

            // -------------------------- //
            if(action.payload) {
                let startTaskIdsNumbers = localStorage.getItem(`${state.start.id}`) // "1,2"
                let startTaskIdsArr = startTaskIdsNumbers.split(',') //["1","2"]
                startTaskIdsArr.splice(state.result.source.index!, 1) // удалили элемент, который тянули в LS
                if (startTaskIdsArr.length === 0) {
                    localStorage.removeItem(`${state.start.id}`)
                } else {
                    localStorage.setItem(`${state.start.id}`, `${startTaskIdsArr.join(",")}`)
                }

                let finishTaskIdsNumbers = localStorage.getItem(`${state.finish.id}`) // "1,2"
                let finishTaskIdsArr
                    if(finishTaskIdsNumbers) {
                        finishTaskIdsArr = finishTaskIdsNumbers.split(',') //["1","2"]
                    } else {
                        finishTaskIdsArr = []
                    }
                finishTaskIdsArr.splice(state.result.destination.index!, 0, state.result.draggableId) // вставили элемент в новое место
                localStorage.setItem(`${state.finish.id}`, `${finishTaskIdsArr.join(",")}`)
            }
        },
        setOpenPriorityСolumn: (state, action: PayloadAction<string>) => {
            const task = state.data.tasks[action.payload]
            task.isOpen = !task.isOpen
        },
        onChangePriority: (state, action: PayloadAction<IPriority>) => {
            const task = state.data.tasks[action.payload.id]
            task.priority = action.payload.index
        },
        deleteTask: (state, action: PayloadAction<IDeleteTask>) => { 
            const deleteArr = state.data.columns[action.payload.column.id].taskIds // массив где произойдёт удаление таски
            const index = deleteArr.indexOf(action.payload.id) // индекс удаляемого элемента в массиве
            deleteArr.splice(index, 1) 

            delete state.data.tasks[action.payload.id] 
        },
        addTaskQuery: (state, action: PayloadAction<IAddTask>) => {},
        addTask: (state, action: PayloadAction<IAddTask>) => {
            const { content, priority, status_id, id } = action.payload
            const newTaskValue = { 
                id: String(id),
                content: content, 
                priority: priority, 
                isOpen: false 
            }
            state.data.tasks[`${id}`] = newTaskValue
            state.data.columns[`${status_id}`].taskIds.push(String(id))
            
            let taskIdsNumbers = localStorage.getItem(`${status_id}`)
            localStorage.setItem(`${status_id}`, `${taskIdsNumbers ? `${taskIdsNumbers},` : ""}${id}`)
        },
        addStatusQuery: (state, action: PayloadAction<IAddStatus>) => {},
        addStatus: (state, action: PayloadAction<IAddStatus>) => {
            const {id, name, priority} = action.payload
            const newColumnValue = {
                id: String(id), //4
                name: name,
                taskIds: [],
            }
            state.data.columns[`${id}`] = newColumnValue // добавили а объект новое свойство
            state.data.columnOrder.splice(Number(priority), 0, `${id}`)
        },
        changeTaskContent: (state, action: PayloadAction<IChangeTaskContent>) => {
            state.data.tasks[action.payload.id].content = action.payload.text
        },
        setInitialData: (state) => {
            state.data = initialData
        },
    }
})

export const { setStatuses, setColumnOrder, setResult, setTasks, setStart, setFinish, reorderTaskInOwnStatus, reorderTaskInDifferentStatus, setOpenPriorityСolumn, onChangePriority, deleteTask, addTask, addTaskQuery, addStatus, addStatusQuery,changeTaskContent, setInitialData } = dndSlice.actions

export default dndSlice.reducer