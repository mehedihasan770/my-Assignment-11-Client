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
import UserHome from "../Pages/Dashboard/UserHome";
import Profile from "../Pages/Dashboard/Profile";
import UserRoutes from "./UserRoutes";

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
                path: 'contest-details/:id',
                element: <ContestDetails/>
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
        element: <Dashboard></Dashboard>,
        children: [
            {
                index: true,
                element: <Navigate to={'/dashboard/home'} />
            },
            {
                path: 'home',
                element: <UserHome/>
            },
            {
                path: 'profile',
                element: <Profile/>
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
        ]
    }
])