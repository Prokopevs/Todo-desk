export interface IDesk {
    addTaskActive?: boolean
    setAddTaskActive?: (...args: boolean[]) => void
    statusActive?: boolean
    setStatusActive?: (...args: boolean[]) => void
}