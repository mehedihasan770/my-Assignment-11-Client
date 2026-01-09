import React from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import { BiHome } from "react-icons/bi";
import { GrUserManager } from "react-icons/gr";
import {
  MdManageSearch,
  MdOutlineBookmarkAdded,
  MdOutlineLeaderboard,
} from "react-icons/md";
import { GiPodiumWinner } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineAddTask } from "react-icons/md";
import useDashboardRole from "../Hooks/useDashboardRole";
import Loader from "../Components/Loading/Loader";
import Footer from "../Components/Home/Footer";

const Dashboard = () => {
  const { roleData, roleLoading } = useDashboardRole();
  return (
    <div className="max-w-11/12 md:max-w-10/12 lg:max-w-9/12 mx-auto">
      <main className="  mt-5 mb-5 rounded-2xl dark:bg-[#261B25]  bg-secondary">
        {roleLoading ? (
          <Loader></Loader>
        ) : (
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="lg:hidden block ml-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 cursor-pointer inline-block size-6"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
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
              <div className="flex min-h-full flex-col   dark:bg-[#1f1f1f] lg:rounded-l-2xl border-r-2 border-white items-start is-drawer-close:w-17 is-drawer-open:w-64">
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
      <footer className='shadow-sm bg-secondary'>
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
