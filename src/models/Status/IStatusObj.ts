export interface IStatus {
    id: string
    name: string
    taskIds: string[]
}

export interface IStatusObj {
    [K: string]: IStatus
}