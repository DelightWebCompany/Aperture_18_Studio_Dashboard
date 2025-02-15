import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/admin/Dashboard";

//user crud
import UserList from "../pages/admin/users/Index";
import UserCreate from "../pages/admin/users/Create";

//banner crud
import BannerList from "../pages/admin/banners/Index";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/errors/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Dashboard /> },

            { path: "/users", element: <UserList /> },
            { path: "/users/create", element: <UserCreate /> },


            { path: "/banners", element: <BannerList /> },
        ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <NotFound /> }
]);

export default router;
