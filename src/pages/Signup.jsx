import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';


const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is to weak")
});

//here we created a schema from zod
//so basically humne key fields create kar diya using zod
//  firstName: z.string().min(3, "Minimum character should be 3"),
// iska matlab hai ye key string form ki honi chahiye aur ismein min 3 characters hone chahiye aur na ho tune characters toh
//error message aana chahiye minimum character should be 3
//similarly baaki sab bhi aise he honge


function Signup() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });



  const onSubmit = async(data) => {
    const result= await dispatch(registerUser(data));
    if(result.type === "auth/register/fulfilled"){
   navigate("/verify-email");
   }
    // Backend data ko send kar dena chaiye?
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900/80"> {/* Centering container */}
      <div className="card w-96 bg-slate-900/80 [0_8px_30px_rgb(0,0,0,0.5)] shadow-xl border border-white"> {/* Existing card styling through daisyUI */}
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">CodeHub</h2> {/* Centered title */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Existing form fields */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="John"
                className={`input input-bordered outline-none w-full ${errors.firstName ? 'input-error' : ''}`}
                {...register('firstName')}
              />
              {errors.firstName && (
                <span className="text-error">{errors.firstName.message}</span>
              )}
            </div>

            <div className="form-control  mt-4">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered outline-none w-full ${errors.emailId ? 'input-error':''}`}
                {...register('emailId')}
              />
              {errors.emailId && (
                <span className="text-error">{errors.emailId.message}</span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered outline-none w-full ${errors.password ? 'input-error':''}`}
                {...register('password')}
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control mt-8 flex justify-center">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'loading':''}`}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>
           {/* Login Redirect */}
            <div className="text-center mt-6"> {/* Increased mt for spacing */}
              <span className="text-sm">
                Already have an account?{' '}
                <NavLink to="/login" className="link link-primary">
                  Login
                </NavLink>
              </span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
