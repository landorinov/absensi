import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../../ui/loader/loadable";

// Pages
const Home = Loadable(lazy(() => import('../../modules/main/Home')));
const UserDetail = Loadable(lazy(() => import('../../modules/user/Detail')));
const History = Loadable(lazy(() => import('../../modules/user/History')));

// Layout
const BlankLayout = Loadable(lazy(() => import('../../ui/layouts/BlankLayout')));
const FullLayout = Loadable(lazy(() => import('../../ui/layouts/FullLayout')));

// Auth Component
const Login = Loadable(lazy(() => import('../../modules/auth/Login')))
const Register = Loadable(lazy(() => import('../../modules/auth/Register')))
const ForgotPassword = Loadable(lazy(() => import('../../modules/auth/ForgotPassword')))

const appRoute = [
    {
        path: '/',
        element: <FullLayout />,
        children: [
            { path: '', element: <Home /> },
        ],
    },
    {
        path: 'users',
        element: <FullLayout />,
        children: [
            { path: 'detail', element: <UserDetail /> },
            { path: 'history', element: <History /> }
        ],
    },
    {
        path: 'auths',
        element: <BlankLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            
        ],
    },
    { 
        path: '*', element: <Navigate to="/auths/login" /> 
    },
]

export default appRoute;