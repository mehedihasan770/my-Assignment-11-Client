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
                element: <AdminRoutes><ManageUsers/></AdminRoutes>
            },
            {
                path: 'create-contest',
                element: <AddContest></AddContest>
            },
        ]
    }
])