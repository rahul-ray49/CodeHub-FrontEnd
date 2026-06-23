import { useState } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Signup from './pages/Signup'
import Homepage from './pages/Homepage'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './authSlice'
import VerifyEmailNotice from './pages/verifyEmailNotice'
import AdminPanel from './pages/AdminPanel'
import ProblemPage from './pages/ProblemPage'
function App() {

  const {isAuthenticated,user,loading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  console.log(user);

  if(loading){
    return <div className="min-h-screen flex items-center justify-center bg-slate-900/80">
      <span className="loading loading-spinner loading-lg" ></span>
    </div>
  }

  return (
    <>
     <Routes>
          <Route path="/" element={isAuthenticated?<Homepage></Homepage>:<Navigate to="/signup"/>}></Route>
           <Route path="/login" element={isAuthenticated?<Navigate to="/"/>:<Login></Login>}></Route>
           <Route path="/signup" element={isAuthenticated?<Navigate to="/"/>:<Signup></Signup>}></Route>
           <Route path="/verify-email" element={<VerifyEmailNotice />}/>
           <Route path="/admin-panel" element={isAuthenticated&&user?.role==="admin"?<AdminPanel></AdminPanel>:<Login></Login>}/>
           <Route path="/problem/:problemId" element={isAuthenticated?<ProblemPage></ProblemPage>:<Login/>}/>
         </Routes>
    </>
  )
}

export default App
