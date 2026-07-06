import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
const adminRegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name is too long"),

    emailId: z
      .string()
      .email("Please enter a valid email"),

    password: z
      .string()
      .min(6, "Password must contain at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });






function AdminRegisterPage(){

   
    const [showPassword,setShowPassword]=useState(false);

    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const navigate = useNavigate();


            const {
            register,
            handleSubmit,
            reset,
            formState:{errors,isSubmitting}
        } = useForm({

            resolver:zodResolver(adminRegisterSchema),

            defaultValues:{
                firstName:"",
                emailId:"",
                password:"",
                confirmPassword:""
            }

        });

        const onSubmit = async (data) => {

                try{
                   
                    await axiosClient.post("/user/admin/register",{

                        firstName:data.firstName,
                        emailId:data.emailId,
                        password:data.password

                    });

                    alert("Admin Registered Successfully");

                    reset();

                }

                catch(err){

                    alert(err.response?.data?.message);

                }
               

            }


    return (
        <>
      
                        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
                            <div className="max-w-2xl mx-auto pt-6 sm:pt-8 px-4 sm:px-6">
                                        <button
                                            onClick={() => navigate("/")}
                                            className="
                                            bg-blue-600
                                            w-full sm:w-fit
                                            flex items-center justify-center gap-2
                                            cursor-pointer
                                            px-4 py-2
                                            border
                                            border-slate-700
                                            rounded-xl
                                            text-slate-300
                                            hover:bg-blue-700
                                            hover:border-blue-500
                                            hover:text-white
                                            transition-all duration-300
                                            "
                                        >
                                            ← Back to Dashboard
                                        </button>
                            </div>

                           <form  onSubmit={handleSubmit(onSubmit)}>
                            <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">

                                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-xl">

                                   <div className="text-center mb-8">

                                        <div className="text-4xl sm:text-5xl mb-3">
                                            🛡️
                                        </div>

                                        <h1 className="text-2xl sm:text-3xl font-bold">
                                            Register Administrator
                                        </h1>

                                        <p className="text-slate-400 mt-2 text-sm sm:text-base">
                                            Create a new administrator account.
                                        </p>

                                    </div>
                                    
                                    <div className="mb-5">

                                        <label className="block mb-2 text-sm font-medium">

                                        Full Name:

                                        </label>

                                        <input

                                        type="text"

                                        placeholder="Enter admin name"

                                        {...register("firstName")}

                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-blue-500"

                                        />

                                        {
                                        errors.firstName &&

                                        <p className="text-red-400 text-xs sm:text-sm mt-1">
                                        {errors.firstName.message}
                                        </p>

                                        }

                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium p-2">
                                            Email Address:
                                        </label>

                                        <input
                                            type="email"
                                            placeholder="Enter admin email"
                                            {...register("emailId")}
                                            className="
                                            w-full
                                            bg-slate-950
                                            border border-slate-700
                                            rounded-xl
                                            px-4
                                            py-3
                                            sm:py-4
                                            outline-none
                                            focus:ring-2
                                            focus:ring-blue-500
                                            text-white
                                            placeholder:text-slate-500
                                            "
                                        />

                                        {errors.emailId && (
                                            <p className="text-red-400 text-xs sm:text-sm mt-2">
                                            {errors.emailId.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium">
                                            Password
                                        </label>

                                        <div className="relative">
                                            <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                            {...register("password")}
                                            className="
                                                w-full
                                                bg-slate-950
                                                border border-slate-700
                                                rounded-xl
                                                px-4
                                                py-3
                                                sm:py-4
                                                pr-12
                                                outline-none
                                                focus:ring-2
                                                focus:ring-blue-500
                                                text-white
                                                placeholder:text-slate-500
                                            "
                                            />

                                            <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                            >
                                            {showPassword ? "🙈" : "👁️"}
                                            </button>
                                        </div>

                                        {errors.password && (
                                            <p className="text-red-400 text-xs sm:text-sm mt-2">
                                            {errors.password.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-8">
                                        <label className="block mb-2 text-sm font-medium">
                                            Confirm Password
                                        </label>

                                        <div className="relative">
                                            <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm password"
                                            {...register("confirmPassword")}
                                            className="
                                                w-full
                                                bg-slate-950
                                                border border-slate-700
                                                rounded-xl
                                                px-4
                                                py-3
                                                sm:py-4
                                                pr-12
                                                outline-none
                                                focus:ring-2
                                                focus:ring-blue-500
                                                text-white
                                                placeholder:text-slate-500
                                            "
                                            />

                                            <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                            >
                                            {showConfirmPassword ? "🙈" : "👁️"}
                                            </button>
                                        </div>

                                        {errors.confirmPassword && (
                                            <p className="text-red-400 text-sm mt-2">
                                            {errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="
                                            w-full
                                            bg-blue-600
                                            hover:bg-blue-700
                                            disabled:bg-slate-700
                                            disabled:cursor-not-allowed
                                            text-white
                                            font-semibold
                                            py-3
                                            sm:py-4
                                            rounded-xl
                                            transition-all
                                            duration-300
                                        "
                                        >
                                        {isSubmitting ? "Registering..." : "Register Admin"}
                                    </button>

                                </div>

                            </div>

                        </form>

                        </div>

        
        </>
    )
}
export default AdminRegisterPage;