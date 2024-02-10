import './style.css';
import { Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink } from 'react-router-dom';

const Signup = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    
    
    const handleChange = (name, value) => {

        setData({
            ...data,
            [name] : value
        })
    }

    return <div className="signup-section">
        <div className="signup-inner-container">
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
            <br/>
            <Button 
                name="signup"
                title="Sign Up"
                // onClick={}
            />
            <br/>
            <NavLink className="gotoLogin" to="/login">Already have an account?</NavLink>
        </div>
    </div>
}

export default Signup;