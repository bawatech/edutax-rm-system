import './style.css';
import { Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../../store/userSlice';

const VerifyEmail = () => {
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
        dispatch(verifyEmail(payload))
            .then(res => {
                alert(res?.data?.message)
                navigate("/user/tax-file-add")
            })
            .catch(err => {
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                } else {
                   // alert(err?.data?.message)
                }
                alert(err?.data?.message)
            })
    }

    return <Layout>
        <div className="signup-section">
            <div className="signup-inner-container">
                <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Verify Email Address</h2>

                <Input
                    name="otp"
                    value={payload?.otp}
                    hint="Otp"
                    handleChange={handleChange}
                    error={errors?.otp}
                />
                <br />
                <Button
                    name="verify"
                    title="Verify"
                    onClick={handleSubmit}
                />
                <br />
            </div>
        </div>
    </Layout>
}

export default VerifyEmail;