export interface ISetOpacity {
    arrName: string
    id: string
}

export interface IChangePrevTask {
    content: string
    id: string
    priority: number
    status_id: string
}

export interface ITask {
    id: string
    priority: number | null
    content: string
}

export interface IPrevTask {
    [K: string]: ITask
}

export interface ITasksInLS {
    [K: string]: string[]
}