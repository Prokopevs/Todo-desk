export interface ITask {
    id: string
    content: string
    priority: number
    isOpen: boolean
}

export interface ITasks {
    [K: string]: ITask
}

export interface IColumn {
    id: string
    name: string
    taskIds: string[]
}

export interface IColumns {
    [K: string]: IColumn
}
