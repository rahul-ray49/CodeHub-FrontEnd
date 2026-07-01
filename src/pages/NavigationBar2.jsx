import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from '../authSlice';

function NavigationBar2(){

    const {user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogout=()=>{
         dispatch(logoutUser())
    }



    return (
           <nav className="border-b border-slate-800 bg-[#111827] sticky top-0 z-50">

                <div className="px-10 mx-auto  py-2 flex justify-between items-center">
                
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold">
                    ⚡
                    </div>

                    <h1 className="text-3xl font-bold">
                    CodeHub
                    </h1>
                </div>

                <div className="relative group">
        
                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer">
                    
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                        {user?.firstName?.charAt(0).toUpperCase()}
                    </div>

                    </div>

                    <div className="absolute right-0 mt-0 hidden group-hover:block w-44 bg-[#111827] border border-slate-700 rounded-xl overflow-hidden">
                    
                    <button onClick={()=>navigate("/profile/me")}
                        className="w-full text-left px-4 py-3 hover:bg-slate-800"
                    >
                        Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10"
                    >
                        Logout
                    </button>

                       <button onClick={() => navigate("/")} className="w-full text-left px-4 py-3 hover:bg-slate-800">
                         Home
                        </button>

                    </div>

                 </div>

                </div>
           </nav>
    )
}
export default NavigationBar2;