export interface IErrorGlobal {
    status: number
    statusText: string
}

export interface IError {
    id: string
    message: string
}
export interface IErrorTasks {
    [K: string]: IError
}