import React from 'react';
import DashBoard from './pages/DashBoard';
import LoginForm from './pages/LoginForm'
import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterForm from './pages/RegisterForm';
import Errors from './pages/Errors';
import { useAppSelector, useAppDispatch } from './hooks/redux'
import { checkAuth, setAuth } from './Store/reducers/authorizationSlice';
import Static from './pages/Static';
import Home from './pages/Home';

const App = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.authorizationSlice)
    const { isLoading, isAuth } = useAppSelector(state => state.authorizationSlice)
    const [authorizationClick, setAuthorizationClick] = React.useState<boolean>(false)
    
    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else{
            dispatch(setAuth(false))
        }
    }, [])

    if (isLoading) {
        return <div></div>
    }

    return (
        <div className='container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/static" element={<Static />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/login" element={<LoginForm loginClick={authorizationClick} setloginClick={setAuthorizationClick}  />} />
                <Route path="/register" element={<RegisterForm registerClick={authorizationClick} setRegisterClick={setAuthorizationClick}/>} />
                <Route path='errors' element={<Errors />} />
            </Routes>
        </div>
    );
}

export default App;
