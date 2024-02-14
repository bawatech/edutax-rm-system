import './style.css';
import { Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/userSlice';
import { Layout } from '../../layouts/Layout';
const Login = () => {
    const [payload, setPayload] = useState({})
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (name, value) => {
        setPayload({
            ...payload,
            [name]: value
        })
        setErrors({
            ...errors,
            [name]: null
        })
    }

    const handleSubmit = () => {
        dispatch(login(payload))
            .then(res => {
                navigate("/user/tax-file-add")
            })
            .catch(err => {
                console.log('err',err)
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                } else {
                    // alert(err?.data?.message)
                }
            })
    }

    return <Layout>
        <div className="login-section">
            <div className="login-inner-container">
                <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Log In</h2>

                <Input
                    name="email"
                    value={payload?.email}
                    hint="Email"
                    handleChange={handleChange}
                    error={errors?.email}
                />
                <Input
                    name="password"
                    type="password"
                    password
                    value={payload?.password}
                    hint="Password"
                    handleChange={handleChange}
                    error={errors?.password}

                />

                <div className='forgot-div'>
                    <NavLink className="gotoForgot" to="/reset">forgot password?</NavLink>
                </div>
                <br />
                <Button
                    name="login"
                    title="Login"
                    onClick={handleSubmit}
                />
                <br />
                <NavLink className="gotoSignup" to="/sign-up">Don't have an account?</NavLink>
            </div>
        </div>
    </Layout>
}

export default Login;