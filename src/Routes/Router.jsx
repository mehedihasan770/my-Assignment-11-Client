import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import AuthLayout from "../Layouts/AuthLayout";
import Dashboard from "../Layouts/Dashboard";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import AdminRoutes from "./AdminRoutes";
import AddContest from "../Pages/Dashboard/AddContest";
import CreatedContests from "../Pages/Dashboard/CreatedContests";
import SubmittedTasks from "../Pages/Dashboard/SubmittedTasks";
import EditContest from "../Pages/Dashboard/EditContest";
import CreatorRoutes from "./CreatorRoutes";
import ManageContests from "../Pages/Dashboard/ManageContests";
import AllContests from "../Pages/AllContests";
import ContestDetails from "../Pages/ContestDetails";
import ParticipatedContests from "../Pages/Dashboard/ParticipatedContests";
import WinningContests from "../Pages/Dashboard/WinningContests";
import Profile from "../Pages/Dashboard/Profile";
import UserRoutes from "./UserRoutes";
import PrivetRoutes from "./PrivetRoutes";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Leaderboard from "../Pages/Dashboard/Leaderboard";
import AboutUs from "../Pages/AboutUs";
import Guidelines from "../Pages/Guidelines";
import PageNotFound from "../Pages/PageNotFound";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'all-contests',
                Component: AllContests,
            },
            {
                path: 'about-us',
                Component: AboutUs,
            },
            {
                path: 'guidelines',
                Component: Guidelines,
            },
            {
                path: 'contest-details/:id',
                element: <PrivetRoutes><ContestDetails/></PrivetRoutes>
            },
        ]
    },
    {
        path: 'auth',
        Component: AuthLayout,
        children: [
            {
                path: 'signin',
                Component: Signin,
            },
            {
                path: 'signup',
                Component: Signup,
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivetRoutes><Dashboard/></PrivetRoutes>,
        children: [
            {
                index: true,
                element: <Navigate to={'/dashboard/home'} />
            },
            {
                path: 'home',
                element: <PrivetRoutes><DashboardHome/></PrivetRoutes>
            },
            {
                path: 'profile',
                element: <PrivetRoutes><Profile/></PrivetRoutes>
            },
            {
                path: 'manage-users',
                element: <AdminRoutes><ManageUsers/></AdminRoutes>
            },
            {
                path: 'manage-contests',
                element: <AdminRoutes><ManageContests/></AdminRoutes>
            },
            {
                path: 'create-contest',
                element: <CreatorRoutes><AddContest/></CreatorRoutes>
            },
            {
                path: 'created-contests',
                element: <CreatorRoutes><CreatedContests/></CreatorRoutes>
            },
            {
                path: 'submitted-tasks/:id',
                element: <CreatorRoutes><SubmittedTasks/></CreatorRoutes>
            },
            {
                path: 'edit-contest/:id',
                element: <CreatorRoutes><EditContest/></CreatorRoutes>
            },
            {
                path: 'participated-contests',
                element: <UserRoutes><ParticipatedContests/></UserRoutes>
            },
            {
                path: 'winning-contests',
                element: <UserRoutes><WinningContests/></UserRoutes>
            },
            {
                path: 'leaderboard',
                element: <PrivetRoutes><Leaderboard/></PrivetRoutes>
            },
        ]
    },
    {
        path: '*',
        Component: PageNotFound,
    }
])