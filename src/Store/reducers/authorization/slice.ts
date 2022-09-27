import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILogin, IRegistration, ISettings, IUser } from './types';

interface AuthorizationState {
  user: IUser,
  isAuth: null | boolean,
  isLoading: boolean,
  rememberMe: boolean,
  confirmLoading: boolean,
  TTLArray: number[],
}

const initialState: AuthorizationState = {
    user: {
        id: null,
        email: "",
        emailConfirmed: false,
        name: "",
        taskTTL: null
    },
    isAuth: false,
    isLoading: true,
    rememberMe: false,
    confirmLoading: true,
    TTLArray: [],
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILogin>) => {},
    registration: (state, action: PayloadAction<IRegistration>) => {},
    checkAuth: (state) => {},
    confirmEmail: (state, action: PayloadAction<string>) => {},
    setAuth: (state, action: PayloadAction<boolean>) => {
        state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
        state.user.taskTTL = action.payload.taskTtl
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
        state.rememberMe = action.payload
    },
    setTTL: (state, action: PayloadAction<number>) => {
        state.user.taskTTL = action.payload
    },
    setSettingsQuery: (state, action: PayloadAction<ISettings>) => {},
    setSettings: (state, action: PayloadAction<ISettings>) => {
        const {email, name, taskTTL} = action.payload
        state.user.email = email
        state.user.name = name
        state.user.taskTTL = taskTTL
    },
    setConfirmEmail: (state) => {
        state.user.emailConfirmed = true
    },
    setConfirmLoading: (state, action: PayloadAction<boolean>) => {
        state.confirmLoading = action.payload
    },
    getTTLArray: (state) => {},
    setTTLArray: (state, action: PayloadAction<number[]>) => {
        state.TTLArray = action.payload
    },
  }
})

export const { setAuth, setUser, setLoading, setRememberMe, login, registration, checkAuth, setTTL, setSettingsQuery, setSettings, confirmEmail, setConfirmEmail, setConfirmLoading, getTTLArray, setTTLArray} = authorizationSlice.actions

export default authorizationSlice.reducer