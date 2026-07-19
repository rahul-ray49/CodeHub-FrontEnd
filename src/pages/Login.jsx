import { useState, useEffect } from 'react'; // Added useState
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginUser } from '../authSlice';
import { Mail, Lock, Code2, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react'; // Added Eye, EyeOff

const loginSchema = z.object({
  emailId: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error, logincredentialserror } = useSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => dispatch(loginUser(data));

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-[#0f172a] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden min-h-[500px]">
        
        <div className="hidden lg:flex flex-1 bg-slate-900/80 p-12 flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Code2 size={32} /> CodeHub
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4">Master algorithms, <br/> one line at a time.</h2>
            <p className="text-blue-100/80 text-lg">Join the community of developers sharpening their skills daily.</p>
          </div>
        </div>

        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center w-full">
          <div className="max-w-sm w-full mx-auto text-blue-500">
            
            <div className="lg:hidden flex items-center gap-2 text-xl font-bold  mb-8 text-blue-500">
              <Code2 size={28} className='text-blue-500' /> CodeHub
            </div>
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-slate-400">Enter your credentials to continue</p>
            </div>

            {logincredentialserror && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-xs">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-600" size={18} />
                  <input
                    type="email"
                    className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-blue-500 transition-all text-white"
                    placeholder="name@domain.com"
                    {...register('emailId')}
                  />
                </div>
                {errors?.emailId && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors?.emailId?.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-600" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-12 pr-12 py-3.5 outline-none focus:border-blue-500 transition-all text-white"
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-600 hover:text-slate-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors?.password && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors?.password?.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer mt-2 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
              >
                {loading ? 'Authenticating...' : (
                  <>Sign In <ArrowRight size={18} /></>
                )}
              </button>
            </form>

            <div className="text-center mt-8 pt-6 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white mb-1">Sign In</h3>
              <p className="text-slate-500 text-[11px] uppercase tracking-wider mb-4">Access your CodeHub account</p>
              <p className="text-slate-500 text-xs">
                Don't have an account?{' '}
                <NavLink to="/signup" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
                  Join CodeHub
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;