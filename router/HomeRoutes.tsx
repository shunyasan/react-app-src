import { Login } from "../components/pages/Login";
import { UserManagement } from "../components/pages/UserManagement";
import { Register } from "../components/pages/Register";
import { Page404 } from "../components/pages/Page404";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Login />,
  },
  {
    path: "/register",
    exact: false,
    children: <Register />,
  },
  {
    path: "/user_management",
    exact: false,
    children: <UserManagement />,
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />,
  },
];
