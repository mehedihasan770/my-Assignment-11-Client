import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { auth } from "../FirebaseConfig/Firebase";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Signin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const axiosSecure = useAxiosSecure();
  const { signInWithEP, signInWithGG, setLoading, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const handleSignIn = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEP(email, password);
      console.log('hallo')
      const user = auth.currentUser;
      const userInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };
      await axiosSecure.post("/users", userInfo);
      toast.success("Signed in successfully!");
      setLoading(false);
      navigate(location?.state || '/');
      reset();
    } catch (error) {
      if (error.response?.status === 409) {
        toast.success("Signed in successfully!");
        navigate(location?.state || '/');
      } else {
        toast.error(`${error.message}`);
      }
      setLoading(false);
    }
  };
  const handleSignInGG = async () => {
    try {
      const res = await signInWithGG();
      setUser(res.user)
      const user = auth.currentUser;
      const userInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };
      await axiosSecure.post("/users", userInfo);
      toast.success("Signed in with Google successfully!");
      navigate(location?.state || '/');
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.success("Signed in with Google successfully!");
        navigate(location?.state || '/');
      } else {
        toast.error(`${error.message}`);
      }
      setLoading(false);
    }
  };
    console.log(location.state)

  return (
    <div className="min-h-screen flex justify-center items-center mt-5 mb-5">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="space-y-5 bg-secondary dark:bg-[#261B25] p-5 w-full max-w-sm rounded-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-primary">
          Welcome Back
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="border border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex flex-col gap-1  relative">
          <label className="text-sm font-medium dark:text-gray-200">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className="border border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="button"
            className="absolute right-3 top-11 -translate-y-1/2 text-xl text-primary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
          <p className="text-sm hover:underline cursor-pointer">
            Forgot password?
          </p>
        </div>

        <button type="submit" className="customBTN">
          Sign In
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <button
          onClick={handleSignInGG}
          type="button"
          className="btn w-full border border-primary py-2 rounded-xl flex items-center justify-center gap-2 dark:border-gray-600"
        >
          <FcGoogle size={30} />
          Sign In With Google
        </button>
        <p className="text-sm dark:text-gray-300">
          Don’t have an account?
          <Link
            to={"/auth/signup"}
            className="text-primary cursor-pointer hover:underline"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
