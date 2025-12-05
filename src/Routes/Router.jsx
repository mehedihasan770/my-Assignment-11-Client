import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AllContests from "../Pages/AllContests";

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
    }
])