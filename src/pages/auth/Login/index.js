import './style.css';
import { Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';

const Login = () => {
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
            <h2 style={{textAlign: 'center', marginBottom: '2em'}}>SignUp</h2>

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

            <Button 
                name="login"
                title="Sign Up"
                // onClick={}
            />
        </div>
    </div>
}

export default Login;