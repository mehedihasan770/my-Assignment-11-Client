import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AllContests from "../Pages/AllContests";
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
                path: 'manage-users',
                element: <ManageUsers/>
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
        ]
    }
])