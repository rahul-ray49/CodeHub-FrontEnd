import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Login from "./pages/Login"
import Signup from './pages/Signup'
import Homepage from './pages/Homepage'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './authSlice'
function App() {

  const {isAuthenticated}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  return (
    <>
     <Routes>
          <Route path="/" element={<Homepage></Homepage>}></Route>
           <Route path="/login" element={<Login></Login>}></Route>
           <Route path="/signup" element={<Signup></Signup>}></Route>
         </Routes>
    </>
  )
}

export default App
