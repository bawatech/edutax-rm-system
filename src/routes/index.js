import React from 'react';
import {
    // Navigate,
    BrowserRouter as Router,
    useRoutes
} from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPass from '../pages/auth/ForgotPass';
import TaxFileAdd from '../pages/user/TaxFileAdd';
import TaxFileDetails from '../pages/user/TaxFileDetails';
import VerifyEmail from '../pages/auth/VerifyEmail';
import NewPassword from '../pages/auth/NewPassword';
import QnaVerify from '../pages/QnaVerify';
import ProfileCreate from '../pages/user/ProfileUpdate';
import ChangePassword from '../pages/auth/ChangePassword';
import Dashboard from '../pages/user/Dashboard';
import ProfileUpdate from '../pages/user/ProfileUpdate';
import ProfileDetails from '../pages/user/ProfileDetails';
import { UserLayout } from '../pages/layouts/Layout';

const AllRoutes = () => {
    // const isLoggedIn = localStorage.getItem('token')
    const routes = [
        {path:'',element:<Login/>},
        {path:'login',element:<Login/>},
        {path:'qna-verify',element:<QnaVerify/>},
        {path:'sign-up',element:<Signup/>},
        {path:'verify-email',element:<VerifyEmail/>},
        {path:'reset',element:<ForgotPass/>},
        
        {path:'verify-forgot-pass-otp',element:<NewPassword/>},
        {path: 'user',element:<UserLayout/>,
        children:[
            {index:true, element : <Dashboard/>},
            {path:'profile', element : <ProfileDetails/>},
            {path:'profile-update', element : <ProfileUpdate/>},
            {path:'taxfile-add', element : <TaxFileAdd/>},
            {path:'taxfile-details/:id', element : <TaxFileDetails/>},
            {path:'settings',element:<ChangePassword/>},
        ]
    },


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