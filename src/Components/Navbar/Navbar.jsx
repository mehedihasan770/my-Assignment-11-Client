import React from "react";
import { FaTrophy } from "react-icons/fa";
import { NavLink } from "react-router";
import { GoSignOut } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { BiHome } from "react-icons/bi";
import { PiLayoutFill } from "react-icons/pi";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, loading, signOutUser } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to={"/"} className="navBTN">
          <BiHome />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/all-contests"} className="navBTN">
          <PiLayoutFill />
          All Contests
        </NavLink>
      </li>
    </>
  );

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error(error);
      toast.error(`Sign out failed: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="navbar bg-secondary dark:bg-[#261B25] mt-3 shadow-sm rounded-2xl">
        <div className="navbar-start">
          <div className="flex items-center text-primary">
            <FaTrophy size={30} />
            <h1 className="text-[18px] md:text-2xl font-bold">ContestHub</h1>
            
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {loading ? (
            <div className="loader h-10"></div>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <img
                  src={user?.photoURL}
                  alt="USR"
                  className="m-1 cursor-pointer w-10 h-10 border-2 border-primary rounded-full"
                />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 space-y-2 w-52 p-2 shadow-sm"
              >
                <li>
                  <NavLink className="navBTN">
                    <ImProfile /> Profile
                  </NavLink>
                </li>
                <div className="lg:hidden block space-y-2">{links}</div>
                <li>
                  <NavLink to={"/dashboard"} className="navBTN">
                    <MdDashboard /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleSignOut} className="navBTN">
                    <GoSignOut /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <li className="list-none">
                <NavLink to={"/auth/signin"} className="navBTN">
                  Sign In
                </NavLink>
              </li>
              <li className="list-none hidden md:block">
                <NavLink to={"/auth/signup"} className="navBTN">
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
