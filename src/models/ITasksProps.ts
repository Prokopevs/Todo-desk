interface IPriority {
    color: string
    description: string
}

interface IPriorityArray {
    [K: number]: IPriority
}

export interface ITasksProps {
    task: any
    index: number
    priorityArray: IPriorityArray
}