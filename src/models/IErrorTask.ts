export interface IErrorTask {
    id: string
    message: string
}

export interface IErrorTasks {
    [K: string]: IErrorTask
}