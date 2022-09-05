export interface IUser {
    id: string | null
    email: string
    emailConfirmed: boolean
    name: string
    taskTTL: number | null
    taskTtl?: number | null
}
