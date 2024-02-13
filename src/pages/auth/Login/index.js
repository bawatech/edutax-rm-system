import './style.css';
import { Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';

const Login = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    const navigate = useNavigate()
    
    
    const handleChange = (name, value) => {

        setData({
            ...data,
            [name] : value
        })
    }

    return <UserLayout>
        <div className="login-section">
        <div className="login-inner-container">
            <h2 style={{textAlign: 'center', marginBottom: '2em'}}>Log In</h2>

            <Input 
                name="email"
                value={data.email}
                hint="Email"
                handleChange={handleChange}
            />
            <Input 
                name="password"
                type="password"
                password
                value={data.password}
                hint="Password"
                handleChange={handleChange}
            />
            
            <div className='forgot-div'>
                <NavLink className="gotoForgot" to="/reset">forgot password?</NavLink>
            </div>
            <br/>
            <Button 
                name="login"
                title="Login"
                onClick={()=>navigate("/home")}
            />
            <br/>
            <NavLink className="gotoSignup" to="/signup">Did'nt have an account?</NavLink>
        </div>
    </div>
    </UserLayout>
}

export default Login;