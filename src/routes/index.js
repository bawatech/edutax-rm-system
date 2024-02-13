import React from 'react';
import {
    // Navigate,
    BrowserRouter as Router,
    useRoutes
} from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPass from '../pages/auth/ForgotPass';
import Home from '../pages/Home/Index';
const AllRoutes = () => {
    // const isLoggedIn = localStorage.getItem('token')
    const routes = [
        {path:'',element:<Welcome/>},
        {path:'welcome',element:<Welcome/>},
        {path:'login',element:<Login/>},
        {path:'sign-up',element:<Signup/>},
        {path:'reset',element:<ForgotPass/>},
        {path:'home',element:<Home/>},


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