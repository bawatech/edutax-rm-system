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
import ChangePassword from '../pages/auth/ChangePassword';
import Dashboard from '../pages/user/Dashboard';
import ProfileUpdate from '../pages/user/ProfileUpdate';
import ProfileDetails from '../pages/user/ProfileDetails';
import { UserLayout } from '../pages/layouts/Layout';
import Home from '../pages/Home';
import InviteSpouse from '../pages/user/InviteSpouse';
import ContactUs from '../pages/Contact';
import TaxFileUpdate from '../pages/user/TaxFileUpdate';
import AcceptInvite from '../pages/auth/AcceptInvite';
import VerifyLogin from '../pages/auth/VerifyLoginEmail';
import Messages from '../pages/user/Messages';
import VerifyForgotPass from '../pages/auth/VerifyForgotPass';
import PaymentResponse from '../pages/payment/PaymentResponse';
// import PersonalTaxFiling from '../pages/PersonalTaxFiling';
// import BusinessCorporateTax from '../pages/BusinessCorporateTax';
// import AccountingBookkeeping from '../pages/AccountingBookkeeping';
// import PayrollServices from '../pages/PayrollServices';
// import IncorporationServices from '../pages/IncorporationServices';

const AllRoutes = () => {
    // const isLoggedIn = localStorage.getItem('token')
    const routes = [
        { path: '', element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'contact', element: <ContactUs /> },
        { path: 'login', element: <Login /> },
        { path: 'qna-verify', element: <QnaVerify /> },
        { path: 'sign-up', element: <Signup /> },
        { path: 'verify-email', element: <VerifyEmail /> },
        { path: 'verify-login', element: <VerifyLogin /> },
        { path: 'reset', element: <ForgotPass /> },
        { path: 'verify-forgot-pass-otp', element: <VerifyForgotPass /> },
        { path: 'set-new-password', element: <NewPassword /> },

        { path: 'accept-invitation/:token', element: <AcceptInvite /> },
        {path:'payment/response/:uid',element:<PaymentResponse/>},
        {
            path: 'user', element: <UserLayout />,
            children: [
                { index: true, element: <Dashboard /> },
                { path: 'profile', element: <ProfileDetails /> },
                { path: 'profile-update', element: <ProfileUpdate /> },
                { path: 'taxfile-add', element: <TaxFileAdd /> },
                { path: 'taxfile/:id', element: <TaxFileDetails /> },
                { path: 'taxfile/update/:id', element: <TaxFileUpdate /> },
                { path: 'messages', element: <Messages /> },
                { path: 'settings', element: <ChangePassword /> },
                { path: 'invite-spouse', element: <InviteSpouse /> },

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