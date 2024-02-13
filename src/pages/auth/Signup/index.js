import './style.css';
import { Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../store/userSlice';

const Signup = () => {
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
        dispatch(signUp(payload))
            .then(res => {
                navigate("/home")
                console.log('rrrrrrrrreeeeee', res)
            })
            .catch(err => {
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                } else {
                    alert(err?.data?.message)
                }
                console.log('errrrrrr', err)
                alert(err?.data?.message)
            })
    }

    return <Layout>
        <div className="signup-section">
            <div className="signup-inner-container">
                <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Sign Up</h2>

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
                <br />
                <Button
                    name="signup"
                    title="Sign Up"
                    onClick={handleSubmit}
                />
                <br />
                <NavLink className="gotoLogin" to="/login">Already have an account?</NavLink>
            </div>
        </div>
    </Layout>
}

export default Signup;