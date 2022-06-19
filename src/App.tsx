import React from 'react';
import './App.css';
import Desk from './components/Desk/Desk';
import Login from './components/Login/Login';

function App() {
  return (
    <div className='container'>
        <Login />
        <Desk />
    </div>
  );
}

export default App;
