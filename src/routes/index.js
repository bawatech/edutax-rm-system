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
import ProfileCreate from '../pages/user/ProfileCreate';
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
        {path: 'user',
        children:[
            {index:true, element : <h1>Dashboard</h1>},
            {path:'profile-create', element : <ProfileCreate/>},
            {path:'tax-file-add', element : <TaxFileAdd/>},
            {path:'tax-file-details/:id', element : <TaxFileDetails/>}
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