import React from "react";
import { FaTrophy } from "react-icons/fa";
import { NavLink } from "react-router";
import { useAuth } from "../../Hooks/Auth";
import { GoSignOut } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { BiHome } from "react-icons/bi";
import { PiLayoutFill } from "react-icons/pi";
import Loader from "../Loading/Loader";

const Navbar = () => {
  const { user, loading } = useAuth()
  const links = <>
    <li><NavLink to={'/'} className="navBTN"><BiHome />Home</NavLink></li>
    <li><NavLink to={'/all-contests'} className="navBTN"><PiLayoutFill />All Contests</NavLink></li>
  </>

  return (
    <div>
      <div className="navbar bg-secondary dark:bg-[#261B25] mt-3 shadow-sm rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center text-primary">
            <FaTrophy size={30}/>
            <h1 className="text-[18px] md:text-2xl font-bold">ContestHub</h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {loading ? <Loader/> : user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button"><img src={user?.photoURL} alt="USR"  className="btn m-1 w-12 h-12 rounded-full" /></div>
            <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 space-y-2 w-52 p-2 shadow-sm">
              <li><NavLink className="navBTN"><ImProfile /> Profile</NavLink></li>
              <li><NavLink className="navBTN"><MdDashboard /> Dashboard</NavLink></li>
              <li><button className="navBTN"><GoSignOut /> Sign Out</button></li>
            </ul>
          </div>) : (
            <>
              <li className="list-none"><NavLink to={'/auth/signin'} className="navBTN">Sign In</NavLink></li>
              <li className="list-none hidden md:block"><NavLink to={'/auth/signup'} className="navBTN">Sign Up</NavLink></li>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
