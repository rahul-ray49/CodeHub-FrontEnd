import { useState } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Signup from './pages/Signup'
import ProblemListPage from './pages/ProblemListPage'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './authSlice'
import VerifyEmailNotice from './pages/verifyEmailNotice'
import AdminPanel from './pages/AdminPanel'
import ProblemPage from './pages/ProblemPage'
import LandingPage from './pages/LandingPage'
import Page404 from './pages/Page404'
import UpdateProblemsSection from './pages/UpdateProblemsSection'
import UpdateProblem from './pages/UpdateProblem'
import NotAuthorizedPage from './pages/NotAuthorizedPage'
import AdminRegisterPage from './pages/AdminRegisterPage'
import ProblemSolvedPage from './pages/ProblemSolvedPage'

function App() {

  const {isAuthenticated,user,loading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  console.log(user);

        if (loading) {
                    return (
                        <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">

                            <div className="flex flex-col items-center gap-4">

                                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                                <p className="text-gray-400">
                                    Loading ....
                                </p>

                            </div>

                        </div>
                    );
                }

  return (
    <>
     <Routes>
          <Route path="/" element={isAuthenticated?<LandingPage/>:<Navigate to="/signup"/>}></Route>
           <Route path="/login" element={isAuthenticated?<Navigate to="/"/>:<Login></Login>}></Route>
           <Route path="/signup" element={isAuthenticated?<Navigate to="/"/>:<Signup></Signup>}></Route>
           <Route path="/verify-email" element={<VerifyEmailNotice />}/>
           <Route path="/problemSection" element={isAuthenticated?<ProblemListPage/>:<Login></Login>}></Route>
           <Route path="/admin-panel" element={isAuthenticated&&user?.role==="admin"?<AdminPanel></AdminPanel>:(isAuthenticated&&user.role==="user"?<NotAuthorizedPage/>:<Login/>)}/>
           <Route path="/problem/:problemId" element={isAuthenticated?<ProblemPage></ProblemPage>:<Login/>}/>
           <Route path="*" element={<Page404></Page404>}></Route>
           <Route path="/updateproblems" element={isAuthenticated&&user.role==="admin"?<UpdateProblemsSection></UpdateProblemsSection>:(isAuthenticated&&user.role==="user"?<NotAuthorizedPage/>:<Login/>)}></Route>
           <Route path="/updateproblem/:problemId" element={isAuthenticated&&user.role==="admin"?<UpdateProblem></UpdateProblem>:(isAuthenticated&&user.role==="user"?<NotAuthorizedPage/>:<Login/>)}></Route>
           <Route path="/admin-register" element={isAuthenticated&&user.role==="admin"?<AdminRegisterPage></AdminRegisterPage>:(isAuthenticated&&user.role==="user"?<NotAuthorizedPage/>:<Login/>)}></Route>
           <Route path="/solved" element={isAuthenticated?<ProblemSolvedPage></ProblemSolvedPage>:<Login></Login>}></Route>
         </Routes>
    </>
  )
}

export default App
