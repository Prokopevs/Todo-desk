export interface IStatusProps {
    column?: any
    tasks: any
    priorityArray: any
    setOpen: (...args: string[]) => void
    onChangePriority: (...args: number[]) => void
};