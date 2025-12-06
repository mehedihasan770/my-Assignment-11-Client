import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm()
  const handleSignUp = data => {
    const {email, password, name, imageURL} = data;
  }

  return (
    <div className="min-h-screen flex justify-center items-center mt-5 mb-5">

      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-5 bg-secondary dark:bg-[#261B25] p-5 w-full max-w-sm rounded-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-primary mb-4">Create an Account</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium dark:text-gray-200">Name</label>
          <input
            type="text"
            {...register('name', {required: "Name is required", minLength: {value: 6, message: "Name must be at least 6 characters"}})}
            placeholder="Enter your Name"
            className="border border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
          />
          {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>)}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium dark:text-gray-200">Image URL</label>
          <input
            type="text"
            {...register("imageURL", {required: "Image URL is required",})}
            placeholder="Enter your Image URL"
            className="border border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
          />
          {errors.imageURL && (<p className="text-red-500 text-sm mt-1">{errors.imageURL.message}</p>)}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium dark:text-gray-200">Email</label>
          <input
            type="email"
            {...register("email", {required: "Email is required", pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address",},})}
            placeholder="Enter your email"
            className="border border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
          />
          {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
        </div>

        <div className="flex flex-col gap-1 relative">
          <label className="text-sm font-medium dark:text-gray-200">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {required: "Password is required",minLength: {value: 6,message: "Password must be at least 6 characters",},pattern: {value:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,message:"Must include 1 uppercase, 1 lowercase, 1 number & 1 special character",},})}
            placeholder="Enter your password"
            className="border border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
          />
          <button type="button" className="absolute right-3 top-11 -translate-y-1/2 text-xl text-primary" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
          {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
        </div>

        <button type="submit" className="customBTN">Sign Up</button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <button type="button" className="btn w-full border border-primary py-2 rounded-xl flex items-center justify-center gap-2 dark:border-gray-600"><FcGoogle size={30} />Sign Up With Google</button>
        <p className="text-sm dark:text-gray-300">have an account?<Link to={'/auth/signin'} className="text-primary cursor-pointer hover:underline">{" "}Sign In</Link></p>
      </form>
    </div>
  );
};

export default Signup;