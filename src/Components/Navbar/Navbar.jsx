import React, { useEffect, useState } from "react";
import { FaMoon, FaTrophy } from "react-icons/fa";
import { NavLink } from "react-router";
import { GoSignOut } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { BiHome } from "react-icons/bi";
import { PiLayoutFill } from "react-icons/pi";
import { IoMdInformationCircleOutline, IoMdMenu } from "react-icons/io";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";
import { IoSunnySharp } from "react-icons/io5";

const Navbar = () => {
  const { user, loading, signOutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
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
      <li>
        <NavLink to={"/about-us"} className="navBTN">
          <IoMdInformationCircleOutline />
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to={"/guidelines"} className="navBTN">
          <FaChartLine />
          Guidelines
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

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <div className="navbar ]  bg-secondary mt-3 shadow-sm rounded-2xl">
        <div className="navbar-start">
          <div className="flex items-center text-primary">
            <FaTrophy size={30} />
            <h1 className="text-[18px] md:text-2xl font-bold">ContestHub</h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end flex items-center space-x-1">
          <span onClick={handleTheme}>
            <span className="cursor-pointer">
              {theme === "dark" ? (
                <FaMoon size={30} />
              ) : (
                <IoSunnySharp size={30} />
              )}
            </span>
          </span>
          {loading ? (
            <div className="loader h-10"></div>
          ) : user ? (
            <>
              <div className="dropdown dropdown-end hidden lg:block">
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
                    <NavLink className="font-bold">{user?.displayName}</NavLink>
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
              <div>
                <div className="dropdown dropdown-end lg:hidden">
                  <div tabIndex={0} role="button" className="cursor-pointer">
                    <IoMdMenu size={30} />
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box z-1 space-y-2 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <NavLink className="font-bold">
                        {user?.displayName}
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
              </div>
            </>
          ) : (
            <>
              <div className="dropdown dropdown-end lg:hidden">
                <div tabIndex={0} role="button" className="cursor-pointer">
                  <IoMdMenu size={30} />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 space-y-2 w-52 p-2 shadow-sm absolute"
                >
                  <div className="lg:hidden block space-y-2">{links}</div>
                </ul>
              </div>
              <li className="list-none">
                <NavLink to={"/auth/signin"} className="navBTN">
                  Sign In
                </NavLink>
              </li>
              <li className="list-none hidden lg:block">
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
