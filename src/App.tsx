import React from 'react';
import Home from './pages/Home';
import LoginForm from './pages/LoginForm'
import { Routes, Route } from 'react-router-dom'
import RegisterForm from './pages/RegisterForm';
import Errors from './pages/Errors';


const App = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path='*' element={<Errors />} />
            </Routes>
        </div>
    );
}

export default App;
