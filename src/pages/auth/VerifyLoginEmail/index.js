import './style.css';
import { Center, Container, FormField, FormGroup, Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
import { useDispatch } from 'react-redux';
import { resendLoginOtp, verifyLogin } from '../../../store/userSlice';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';

const VerifyLogin = () => {
    const [payload, setPayload] = useState({})
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const [loadingButton,setLoadingButton] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    console.log("email", location?.state?.data, payload)

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
        dispatch(verifyLogin(payload))
            .then(res => {
                toastSuccess(res?.data?.message)
                navigate("/user")
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

    const handleResendOtp = () =>{
        dispatch(resendLoginOtp({email:location?.state?.data}))
        .then((res)=>{
            console.log("resend",res)
            toastSuccess(res?.data?.message)
        })
        .catch((err)=>{
            console.log("resend",err)
            toastError(err?.data?.message)
        })
    }

    return <Layout>
        <Container maxWidth="30em">
            <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Verify Login</h2>

            <span>Otp Sent to <b>{location?.state?.data}</b></span>
            <FormGroup>
                <FormField>
                    <Input
                        name="otp"
                        value={payload?.otp}
                        hint="Enter Otp Here"
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

export default VerifyLogin;