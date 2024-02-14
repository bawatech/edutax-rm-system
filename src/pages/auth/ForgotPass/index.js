import './style.css';
import { Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
const ForgotPass = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    
    
    const handleChange = (name, value) => {

        setData({
            ...data,
            [name] : value
        })
    }

    return <div className="login-section">
        <div className="login-inner-container">
            <h2 style={{textAlign: 'center', marginBottom: '2em'}}>Reset Password</h2>

            <Input 
                name="email"
                value={data.email}
                hint="Email"
                handleChange={handleChange}
            />

            <br/>

            <Button 
                name="forgotPass"
                title="Forgot Password"
                // onClick={}
            />
            <br/>
            <NavLink className="gotoLogin" to="/login">want to back to login?</NavLink>
        </div>
    </div>
}

export default ForgotPass;