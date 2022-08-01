import { AppDispatch } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import $api from "../../http";
import {IUser} from "../../models/IUser";
import AuthService from "../../services/AuthService";

interface AuthorizationState {
  user: IUser,
  isAuth: null | boolean,
  isLoading: boolean,
}

const initialState: AuthorizationState = {
  user: {
    id: null,
    email: "",
    emailConfirmed: false,
    name: "",
  },
  isAuth: null,
  isLoading: false,
}

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
    },
  }
})

export const login = (email, password) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.login(email, password)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(checkAuth())
    } catch (e) {
        console.log(e.response?.data?.message)
        dispatch(setAuth(false))
    }
}

export const registration = (email, name, password) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.registration(email, name, password)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(checkAuth())
    } catch (e) {
        console.log(e.response?.data?.message)
        dispatch(setAuth(false))
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const response = await $api.get<IUser>('/auth/me')
        dispatch(setUser(response.data))
        dispatch(setAuth(true))
    } catch (e) {
        console.log(e.response?.data?.message);
        dispatch(setAuth(false))
    } finally {
        dispatch(setLoading(false))
    }
}

export const { setAuth, setUser, setLoading } = authorizationSlice.actions

export default authorizationSlice.reducer