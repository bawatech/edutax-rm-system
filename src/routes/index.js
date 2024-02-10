import React from 'react';
import {
    Navigate,
    BrowserRouter as Router,
    useRoutes
} from 'react-router-dom';
import Welcome from '../pages/Welcome';
// import ErrorPage from '../pages/ErrorPage.js'
// import { Layout as LayoutYR22 } from '../YR22/pages/Layout.js';
// import {Layout as LayoutYR23 } from '../YR23/pages/Layout.js'
// import LoginLayout from '../pages/login/LoginLayout.js';
// import Login from '../pages/login/index.js';
// import SignUp from '../pages/login/SignUp.js';
// import UserLayout from '../pages/User/UserLayout.js'
// import HomeLayout from '../pages/HomeLayout/index.js'
// import Home from '../pages/home/index.js'
// import UserHome from '../pages/User/UserHome.js';
// import Test from '../pages/Test.js';
// import routesYR22 from './routesYR22.js';
// import routesYR23 from './routesYR23.js';
// import CraAutoFillHandler from '../pages/afr/CraAutoFillHandler.js';




const AllRoutes = () => {
    // const isLoggedIn = localStorage.getItem('token')
    const routes = [
        {path:'',element:<Welcome/>},
        {path:'welcome',element:<Welcome/>},


        { path: '*', element: <h1>error</h1> }
    ]
    return useRoutes(routes);
}

const BtRouter = () => {
    return (
        <Router basename='/'>
            <AllRoutes />
        </Router>

    )
}

export default BtRouter