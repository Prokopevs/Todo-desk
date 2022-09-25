import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILogin, IRegistration, ISettings, IUser } from './types';

interface AuthorizationState {
  user: IUser,
  isAuth: null | boolean,
  isLoading: boolean,
  rememberMe: boolean,
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
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILogin>) => {},
    registration: (state, action: PayloadAction<IRegistration>) => {},
    checkAuth: (state) => {},
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
        console.log(action.payload)
    },
    setSettingsQuery: (state, action: PayloadAction<ISettings>) => {},
    setSettings: (state, action: PayloadAction<ISettings>) => {
        const {email, name, taskTTL} = action.payload
        state.user.email = email
        state.user.name = name
        state.user.taskTTL = taskTTL
    },
  }
})

export const { setAuth, setUser, setLoading, setRememberMe, login, registration, checkAuth, setTTL, setSettingsQuery, setSettings } = authorizationSlice.actions

export default authorizationSlice.reducer