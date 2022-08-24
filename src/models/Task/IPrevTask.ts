export interface ITask {
    id: string
    priority: number | null
    content: string
}

export interface IPrevTask {
    [K: string]: ITask
}
