export interface IUser {
    id: string | null
    email: string
    emailConfirmed: boolean
    name: string
    taskTtl: number | null
}
