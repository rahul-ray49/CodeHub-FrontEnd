import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import axiosClient from "../utils/axiosClient";
import NavigationBar2 from "./NavigationBar2";
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

const adminRegisterSchema = z.object({
  firstName: z.string().min(3, "Name must be at least 3 characters").max(30, "Name is too long"),
  emailId: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

function AdminRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: { firstName: "", emailId: "", password: "", confirmPassword: "" }
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post("/user/admin/register", {
        firstName: data.firstName,
        emailId: data.emailId,
        password: data.password
      });
      alert("Admin Registered Successfully");
      reset();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

 return (
    <div className="h-screen flex flex-col bg-[#0B1120] text-white">
      <NavigationBar2 />
      
      <div className="flex-grow overflow-y-auto flex items-center justify-center p-4">
        
        {/* Compact Form: reduced padding and spacing */}
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="w-full max-w-sm bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-600/20">
              <ShieldCheck className="text-blue-500 w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Register Admin</h1>
          </div>

          {/* Form Fields: Reduced gap-4 to gap-3 */}
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 text-slate-600" size={16} />
                <input {...register("firstName")} placeholder="John Doe" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 text-slate-600" size={16} />
                <input {...register("emailId")} type="email" placeholder="admin@codehub.com" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 text-slate-600" size={16} />
                <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg pl-10 pr-10 py-2.5 outline-none focus:border-blue-500 text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-600 hover:text-white">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 text-slate-600" size={16} />
                <input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-[#0b1120] border border-slate-700 rounded-lg pl-10 pr-10 py-2.5 outline-none focus:border-blue-500 text-sm" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-slate-600 hover:text-white">
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all"
          >
            {isSubmitting ? "Processing..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegisterPage;
