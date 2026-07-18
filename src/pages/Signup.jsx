import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerUser } from '../authSlice';
import { Mail, Lock, User, Code2, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

const signupSchema = z.object({
  firstName: z.string().min(3, "Name must be at least 3 characters"),
  emailId: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, signupcredentialserror } = useSelector((state) => state.auth);

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: zodResolver(signupSchema) 
  });

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser(data));
    if (result.type === "auth/register/fulfilled") {
      navigate("/verify-email");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-6">
      {/* Increased max-w-4xl and rounded corners */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-[#0f172a] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden min-h-[500px]">
        
        {/* Left Side: Branding */}
        <div className="hidden lg:flex flex-1 bg-slate-900/80 p-12 flex-col justify-between text-white">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Code2 size={32} /> CodeHub
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4">Start your journey <br/> in tech today.</h2>
            <p className="text-blue-100/80 text-lg">Create your account and unlock access to thousands of coding challenges.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-10 sm:p-12 flex flex-col justify-center w-full">
          <div className="max-w-sm w-full mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-slate-400">Join our developer community</p>
            </div>

            {signupcredentialserror && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-xs">
                <AlertCircle size={16} />
                <span>{signupcredentialserror}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {[
                { name: 'firstName', label: 'Full Name', icon: User, type: 'text', placeholder: 'rahul ray' },
                { name: 'emailId', label: 'Email', icon: Mail, type: 'email', placeholder: 'rahul@gmail.com' }
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">{field.label}</label>
                  <div className="relative">
                    <field.icon className="absolute left-4 top-3.5 text-slate-600" size={18} />
                    <input
                      type={field.type}
                      className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-blue-500 transition-all text-white"
                      placeholder={field.placeholder}
                      {...register(field.name)}
                    />
                  </div>
                  {errors[field.name] && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors[field.name].message}</p>}
                </div>
              ))}

              {/* Password Fields */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-600" size={18} />
                  <input type={showPass ? "text" : "password"} {...register('password')} className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-12 pr-12 py-3.5 text-sm outline-none text-white" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3.5 text-slate-600"><Eye size={18}/></button>
                </div>
                {errors.password && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-600" size={18} />
                  <input type={showConfirm ? "text" : "password"} {...register('confirmPassword')} className="w-full bg-[#0b1120] border border-slate-800 rounded-xl pl-12 pr-12 py-3.5 text-sm outline-none text-white" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-3.5 text-slate-600"><Eye size={18}/></button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.confirmPassword.message}</p>}
              </div>

              <button type="submit" disabled={loading} className="w-full mt-4 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg">
                {loading ? 'Processing...' : <>Sign Up <ArrowRight size={18} /></>}
              </button>
            </form>
            <p className="text-center text-slate-500 text-xs mt-6">
              Already have an account? <NavLink to="/login" className="text-blue-400 font-bold text-sm">Login</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;