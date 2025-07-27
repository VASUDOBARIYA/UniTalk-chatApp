import React, { useContext } from 'react';
import {Routes,Route, Navigate} from 'react-router-dom'
import './index.css';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Profile from './pages/ProfilePage.jsx';
import { Toaster } from 'react-hot-toast'
import { AppContext } from '../Context/AppContext.jsx';

const App = () => {
  const {authUser} = useContext(AppContext);
  return (
    <>
    <div className="bg-[url('/background.webp')] bg-contain">
    <Toaster />
    <Routes>
      <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}></Route>
      <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/"/>}></Route>
      <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login"/>}></Route>
    </Routes>
    </div>
    </>
  );
}

export default App;
