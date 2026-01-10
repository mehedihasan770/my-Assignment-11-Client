import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { BiHome } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import {
  MdManageSearch,
  MdOutlineBookmarkAdded,
  MdOutlineLeaderboard,
  MdMenu,
} from "react-icons/md";
import { GiPodiumWinner } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineAddTask } from "react-icons/md";
import useDashboardRole from "../Hooks/useDashboardRole";
import Loader from "../Components/Loading/Loader";
import Footer from "../Components/Home/Footer";
import toast from "react-hot-toast";
import { useAuth } from "../Hooks/useAuth";
import Navbar from "../Components/Navbar/Navbar";

const Dashboard = () => {
  const { roleData, roleLoading } = useDashboardRole();
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
      try {
        await signOutUser();
        toast.success("Signed out successfully!");
      } catch (error) {
        toast.error(`Sign out failed: ${error.message}`);
      }
    };

  return (
    <>
    <div className="max-w-11/12 md:max-w-10/12 lg:max-w-9/12 mx-auto">
      <div className="hidden">
        <Navbar></Navbar>
      </div>
      <nav className="bg-secondary/90 backdrop-blur-3xl sticky top-0 z-40 shadow-md rounded-b-2xl mb-5">
        <div className="px-4 py-3 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition duration-200"
          >
            <BiHome className="text-xl" />
            <span>Back To Home</span>
          </button>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-3">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-primary"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                </div>
              )}
              <div className="text-right">
                <p className="font-semibold text-sm">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 p-2 bg-secondary dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 rounded-3xl bg-primary cursor-pointer text-white flex items-center gap-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-8 h-8 rounded-full border-2 border-primary"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                </div>
              )}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-1 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 p-2 bg-secondary dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <p className="font-semibold text-sm">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left mt-2 px-4 py-2 rounded-3xl bg-primary cursor-pointer text-white flex items-center gap-2"
                    >
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="block"
            >
              <MdMenu className="cursor-pointer size-6" />
            </label>
          </div>
        </div>
      </nav>

      <main className="mt-5 mb-5 rounded-2xl dark:bg-[#261B25] bg-secondary">
        {roleLoading ? (
          <Loader></Loader>
        ) : (
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              
              <div className="p-5">
                <Outlet />
              </div>
            </div>

            <div className="drawer-side z-51 lg:z-0 is-drawer-close:overflow-visible">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="flex min-h-full flex-col bg-secondary/20 backdrop-blur-3xl lg:rounded-l-2xl border-r-2 border-white items-start is-drawer-close:w-17 is-drawer-open:w-64">
                <ul className="menu w-full grow space-y-2">
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="open sidebar"
                    className="lg:block hidden cursor-pointer mx-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                      className="my-1.5 inline-block size-6"
                    >
                      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                      <path d="M9 4v16"></path>
                      <path d="M14 10l2 2l-2 2"></path>
                    </svg>
                  </label>

                  <li>
                    <NavLink
                      to={"/dashboard/home"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right dasBTN"
                      data-tip="Homepage"
                    >
                      <BiHome className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden whitespace-nowrap overflow-hidden text-ellipsis">
                        Homepage
                      </span>
                    </NavLink>
                  </li>

                  {roleData?.role === "user" && (
                    <>
                      <li>
                        <NavLink
                          to={"/dashboard/participated-contests"}
                          className="is-drawer-close:tooltip is-drawer-close:tooltip-right dasBTN"
                          data-tip="My Participated Contests"
                        >
                          <MdOutlineBookmarkAdded className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden whitespace-nowrap overflow-hidden text-ellipsis">
                            Participated Contests
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/winning-contests"}
                          className="is-drawer-close:tooltip is-drawer-close:tooltip-right dasBTN"
                          data-tip="My Winning Contests"
                        >
                          <GiPodiumWinner className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden whitespace-nowrap overflow-hidden text-ellipsis">
                            Winning Contests
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  {roleData?.role === "creator" && (
                    <>
                      <li>
                        <NavLink
                          to={"/dashboard/create-contest"}
                          className="is-drawer-close:tooltip is-drawer-close:tooltip-right dasBTN"
                          data-tip="Create Contest"
                        >
                          <IoMdAddCircleOutline className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden whitespace-nowrap overflow-hidden text-ellipsis">
                            Create Contest
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/created-contests"}
                          className="is-drawer-close:tooltip is-drawer-close:tooltip-right dasBTN"
                          data-tip="My Created Contests"
                        >
                          <MdOutlineAddTask className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden whitespace-nowrap overflow-hidden text-ellipsis">
                            My Created Contests
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  {roleData?.role === "admin" && (
                    <>
                      <li>
                        <NavLink
                          to={"/dashboard/manage-users"}
                          className="is-drawer-close:tooltip is-drawer-close:tooltip-right dasBTN"
                          data-tip="Manage Users"
                        >
                          <GrUserManager className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden whitespace-nowrap overflow-hidden text-ellipsis">
                            Manage Users
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/manage-contests"}
                          className="is-drawer-close:tooltip is-drawer-close:tooltip-right dasBTN"
                          data-tip="Manage Contests"
                        >
                          <MdManageSearch className="my-1.5 inline-block size-4" />
                          <span className="is-drawer-close:hidden whitespace-nowrap overflow-hidden text-ellipsis">
                            Manage Contests
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  <li>
                    <NavLink
                      to={"/dashboard/leaderboard"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right dasBTN"
                      data-tip="Leaderboard"
                    >
                      <MdOutlineLeaderboard className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden whitespace-nowrap overflow-hidden text-ellipsis">
                        Leaderboard
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={"/dashboard/profile"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right dasBTN"
                      data-tip="Profile"
                    >
                      <ImProfile className="my-1.5 inline-block size-4" />
                      <span className="is-drawer-close:hidden whitespace-nowrap overflow-hidden text-ellipsis">
                        Profile
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    <footer className='shadow-sm bg-secondary pt-3'>
        <Footer />
      </footer>
      </>
  );
};

export default Dashboard;