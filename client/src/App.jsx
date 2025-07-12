import React from 'react';
import {Routes,Route} from 'react-router-dom'
import './index.css';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Profile from './pages/ProfilePage.jsx';

const App = () => {
  return (
    <>
    <div className="bg-[url('./src/assets/background.webp')] bg-contain">
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
    </div>
    </>
  );
}

export default App;
