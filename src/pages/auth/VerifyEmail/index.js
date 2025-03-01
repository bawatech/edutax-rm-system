import './style.css';
import { Center, Container, FormField, FormGroup, Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { resendSignupOtp, verifyEmail } from '../../../store/userSlice';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';

const VerifyEmail = () => {
    const [payload, setPayload] = useState({})
    const [errors, setErrors] = useState({});
    const [loadingButton,setLoadingButton] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(store=>store.user);

    const location = useLocation()

    const handleChange = (name, value) => {
        setPayload({
            ...payload,
            [name]: value,
            ['email']: location?.state?.data
        })
        setErrors({
            ...errors,
            [name]: null
        })
    }

    const handleSubmit = () => {
        setLoadingButton(true)
        dispatch(verifyEmail(payload,user))
            .then(res => {
                setLoadingButton(false)
                toastSuccess(res?.data?.message)
                    navigate("/user/profile?redirect-type=sign-up")
                
            })
            .catch(err => {
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                }
                setLoadingButton(false)
                toastError(err?.data?.message)
            })
    }

    const handleResendOtp = () =>{
        dispatch(resendSignupOtp({email:location?.state?.data}))
        .then((res)=>{
            toastSuccess(res?.data?.message)
        })
        .catch((err)=>{
            toastError(err?.data?.message)
        })
    }

    return <Layout>
        <Container maxWidth="30em">
            <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Verify Email Address</h2>

            <span>Otp sent to <b>{location?.state?.data}</b></span>
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

            <Center>
                <p style={{fontSize: '0.9em'}}>Didn't receive the OTP ? <span style={{cursor: 'pointer', color: 'var(--theme-color-a)'}} onClick={handleResendOtp}>Send again</span></p>
            </Center>
        </Container>
        
    </Layout>
}

export default VerifyEmail;