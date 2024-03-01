import './style.css';
import { Container, FormField, FormGroup, Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
import { useDispatch } from 'react-redux';
import { forgotPassword, verifyEmail } from '../../../store/userSlice';
import { hideLoader, showLoader } from '../../../BTUI/BtLoader';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';

const ForgotPassword = () => {
    const [payload, setPayload] = useState({})
    const [errors, setErrors] = useState({});
    const [loadingButton, setLoadingButton] = useState(false)
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
        dispatch(forgotPassword(payload))
            .then(res => {
                setLoadingButton(false)
                toastSuccess(res?.data?.message)
                navigate("/verify-forgot-pass-otp", {state: {email: payload?.email}})
            })
            .catch(err => {
                setLoadingButton(false)
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                } else {
                    // alert(err?.data?.message)
                }
                toastError(err?.data?.message)
            })
    }

    return <Layout>
        <Container maxWidth="30em">
            {/* <div className="signup-section">
                <div className="signup-inner-container"> */}
                <br/>
                    <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Forgot Password? Get Otp</h2>

                    <FormGroup>
                        <FormField>
                            <Input
                                name="email"
                                value={payload?.email}
                                hint="Email"
                                handleChange={handleChange}
                                error={errors?.email}
                            />
                        </FormField>
                    </FormGroup>
                    <br />

                    <div style={{textAlign: 'center'}}>
                        <Button
                            name="getOtp"
                            title="Get Otp"
                            loading={loadingButton}
                            onClick={handleSubmit}
                        />
                    </div>
                    
                    <br />
                {/* </div>
            </div> */}
        </Container>
        
    </Layout>
}

export default ForgotPassword;