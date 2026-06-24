import { logoutUser } from '../authSlice';
import { Link, NavLink } from 'react-router';


 function NavigationBar({user,setSolvedProblems}){
 
   

            const handleLogout = () => {
                  dispatch(logoutUser());
                  setSolvedProblems([]); // Clear solved problems on logout
            };

    return (
        <>
          {/* Navbar */}
        <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <NavLink
          to="/"
          className="text-3xl font-extrabold tracking-wide text-white hover:text-blue-400 transition"
        >
          <div className='flex items-center gap-3'>

           <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg font-bold">
              ⚡
            </div>
          <div>CodeHub</div>
          </div>
        </NavLink>
         <div className='flex justify-between gap-5'>
          <Link to="/">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20">Return to Home</button>
          </Link>
          {
          user?.role==="admin"&&(
             <Link to="/admin-panel">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20">Create Problem Section</button>
          </Link>
          )
          }
           <div className="relative group">
          <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition font-medium"> 
            {user?.firstName}
          </button>

          <div className="absolute top-12 right-0 w-40 bg-slate-900 border border-slate-700 shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-400 hover:bg-slate-800 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
        
        </>
    )
}
export default NavigationBar;