import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex justify-center items-center mt-5 mb-5">
      <form className="space-y-5 bg-secondary dark:bg-[#261B25] p-5 w-full max-w-sm rounded-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4 text-primary">Welcome Back</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium dark:text-gray-200">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-1  relative">
          <label className="text-sm font-medium dark:text-gray-200">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="border border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
          />
          <button type="button" className="absolute right-3 top-11 -translate-y-1/2 text-xl text-primary" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
          <p className="text-sm hover:underline cursor-pointer">Forgot password?</p>
        </div>

        <button type="submit" className="customBTN">Sign In</button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <button type="button" className="btn w-full border border-primary py-2 rounded-xl flex items-center justify-center gap-2 dark:border-gray-600"><FcGoogle size={30} />Sign In With Google</button>
        <p className="text-sm dark:text-gray-300">Don’t have an account?<Link to={'/auth/signup'} className="text-primary cursor-pointer hover:underline">{" "}Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Signin;
