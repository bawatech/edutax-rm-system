import './style.css';
import { Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/userSlice';
import { Layout } from '../../layouts/Layout';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';
const Login = () => {
    const [payload, setPayload] = useState({})
    const [errors, setErrors] = useState({});
    const [loadingButton,setLoadingButton] = useState(false)
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
        setLoadingButton(true)
        dispatch(login(payload))
            .then(res => {
                toastSuccess(res?.data?.message)
                navigate("/user/tax-file-add")
                setLoadingButton(false)
                
            })
            .catch(err => {
            
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                    toastError(err?.data?.message)
                } else {
                    toastError(err?.data?.message)
                }
                setLoadingButton(false)
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
                    loading={loadingButton}
                    loadingText="Logging In"
                    onClick={handleSubmit}
                />
                <br />
                <NavLink className="gotoSignup" to="/qna-verify">Don't have an account?</NavLink>
            </div>
        </div>
    </Layout>
}

export default Login;