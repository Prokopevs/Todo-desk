export interface IPrevTaskObj {
    priority: number
    id: string
    content: string
}

export interface IPrevTask {
    [K: string]: IPrevTaskObj
}
