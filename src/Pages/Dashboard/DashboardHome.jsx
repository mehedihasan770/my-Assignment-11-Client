import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import Loader from "../../Components/Loading/Loader";
import useDashboardRole from "../../Hooks/useDashboardRole";

const DashboardHome = () => {
  const { user, loading } = useAuth();
  const { roleData, roleLoading } = useDashboardRole();

  if (loading || roleLoading) return <Loader />;

  return (
    <div className="md:p-12 mt-10">
      {roleData?.role === "user" ? (
        <div className="bg-linear-to-br from-green-300 to-green-500 py-6 md:p-6 lg:p-12 rounded-3xl shadow-2xl relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.photoURL}
              alt=""
              className="w-28 h-28 rounded-full border-4 border-green-500 shadow-lg object-cover"
            />
          </div>
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-800 mb-4">
              User Panel
            </h3>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🏆 Congratulations!{user?.displayName} You are part of exciting contests, competing
              and growing.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🔹 Participate in contests, submit tasks, and track your progress.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🔹 Check your win rate, celebrate achievements, and improve with
              each contest.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🔹 Explore new contests and interact with creators for more
              opportunities.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              💡 Tip: Stay active, submit quality tasks, and aim to be a top
              participant!
            </p>
            <span className="inline-block mt-6 px-6 py-3 bg-green-500 text-white rounded-full font-semibold text-lg">
              User Tools
            </span>
          </div>
        </div>
      ) : roleData?.role === "admin" ? (
        <div className="bg-linear-to-br from-red-300 to-red-500 py-6 md:p-6 lg:p-12 rounded-3xl shadow-2xl relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.photoURL}
              alt=""
              className="w-28 h-28 rounded-full border-4 border-red-500 shadow-lg object-cover"
            />
          </div>
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-800 mb-4">
              Admin Panel
            </h3>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🎯 Congratulations!{user?.displayName} As an Admin, you are the backbone of the
              platform.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🔹 Manage all users, approve contests, and ensure fairness.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🔹 Analyze platform-wide statistics and make data-driven
              decisions.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🔹 Moderate content and maintain a safe, fair environment.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              💡 Tip: Use your powers responsibly to motivate creators and
              users.
            </p>
            <span className="inline-block mt-6 px-6 py-3 bg-red-500 text-white rounded-full font-semibold text-lg">
              Admin Tools
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-linear-to-br from-blue-300 to-blue-500 py-6 md:p-6 lg:p-12 rounded-3xl shadow-2xl relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.photoURL}
              alt=""
              className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg object-cover"
            />
          </div>
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-800 mb-4">
              Creator Panel
            </h3>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🎨 Congratulations!{user?.displayName} You are shaping the creative world with your
              contests.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🔹 Create engaging contests and attract talented participants.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🔹 Monitor submissions and give timely feedback to help
              participants improve.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              🔹 Track your earnings and maintain your creator profile
              professionally.
            </p>
            <p className="text-gray-700 dark:text-gray-500 mb-3 text-lg">
              💡 Tip: Encourage participants, celebrate winners, and maintain a
              positive environment.
            </p>
            <span className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-full font-semibold text-lg">
              Creator Tools
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
