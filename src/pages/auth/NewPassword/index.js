import './style.css';
import { Container, FormField, FormGroup, Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
import { useDispatch } from 'react-redux';
import { setNewPassword } from '../../../store/userSlice';

const NewPassword = () => {
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
        dispatch(setNewPassword(payload))
            .then(res => {
                alert(res?.data?.message)
                navigate("/login")
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
        <Container maxWidth="30em">
        {/* <div className="signup-section">
            <div className="signup-inner-container"> */}
                <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Set New Password</h2>

                <FormGroup>
                    <FormField>
                        <Input
                            name="email"
                            value={payload.email}
                            hint="Email"
                            handleChange={handleChange}
                            error={errors?.email}
                        />
                    </FormField>
                </FormGroup>
                <FormGroup>
                    <FormField>
                        <Input
                            name="otp"
                            value={payload.otp}
                            hint="OTP"
                            handleChange={handleChange}
                            error={errors?.otp}
                        />
                    </FormField>
                </FormGroup>
                <FormGroup>
                    <FormField>
                        <Input
                            name="newPassword"
                            value={payload.newPassword}
                            hint="New Password"
                            handleChange={handleChange}
                            error={errors?.newPassword}
                        />
                    </FormField>
                </FormGroup>

                <br />
                <Button
                    name="setNewPassword"
                    title="Set New Password"
                    onClick={handleSubmit}
                />
                <br />
                
            {/* </div>
        </div> */}
        </Container>
    </Layout>
}

export default NewPassword;