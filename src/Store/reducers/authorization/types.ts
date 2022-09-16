export interface ISettings {
    email: string
    name: string
    password: string
    taskTTL: number
    emailConfirmed: boolean
}

export interface IUser {
    id: string | null
    email: string
    emailConfirmed: boolean
    name: string
    taskTTL: number | null | undefined
    taskTtl?: number | null
}

export interface IRegistration {
    name: string
    email: string
    password: string
}

export interface ILogin {
    email: string
    password: string
    rememberMe: boolean
}