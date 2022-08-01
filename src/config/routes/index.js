import { lazy } from "react";
import Loadable from "../../ui/loader/loadable";

// Pages
const Home = Loadable(lazy(() => import('../../modules/Home')));

// Layout
const BlankLayout = Loadable(lazy(() => import('../../ui/layouts/BlankLayout')));
const FullLayout = Loadable(lazy(() => import('../../ui/layouts/FullLayout')));

// Auth Component
const Login = Loadable(lazy(() => import('../../modules/auth/Login')))
const Register = Loadable(lazy(() => import('../../modules/auth/Register')))

const appRoute = [
    {
        path: '/',
        element: <FullLayout />,
        children: [
            { path: '', element: <Home /> },
        ],
    },
    {
        path: 'auth',
        element: <BlankLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ],
    }
]

export default appRoute;