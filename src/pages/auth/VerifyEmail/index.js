import './style.css';
import { Container, FormField, FormGroup, Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../../../store/userSlice';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';

const VerifyEmail = () => {
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
        dispatch(verifyEmail(payload))
            .then(res => {
                toastSuccess(res?.data?.message)
                navigate("/user/profile?redirect-type=sign-up")
            })
            .catch(err => {
                if (err?.data?.field_errors) {
                    toastError(err?.data?.message)
                    setErrors(err?.data?.field_errors)
                } else {
                   // alert(err?.data?.message)
                }
                toastError(err?.data?.message)
            })
    }

    return <Layout>
        <Container width="30em">
            {/* <div className="signup-section">
                <div className="signup-inner-container"> */}
                    <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Verify Email Address</h2>

                    <FormGroup>
                        <FormField>
                            <Input
                                name="otp"
                                value={payload?.otp}
                                hint="Otp"
                                handleChange={handleChange}
                                error={errors?.otp}
                            />
                        </FormField>
                    </FormGroup>
                    <br />

                    <div style={{textAlign: 'center'}}>
                        <Button
                            name="verify"
                            title="Verify"
                            loading={loadingButton}
                            loadingText="Verifying OTP..."
                            onClick={handleSubmit}
                        />
                    </div>
                    
                    <br />
                {/* </div>
            </div> */}
        </Container>
        
    </Layout>
}

export default VerifyEmail;