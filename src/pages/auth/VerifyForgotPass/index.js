import './style.css';
import { Center, Container, FormField, FormGroup, Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
import { resendForgotPassOtp } from '../../../store/userSlice';
import { useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';

const VerifyForgotPass = () => {
    const [payload, setPayload] = useState({})
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()


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
        navigate('/set-new-password', {state: {
            email: location?.state?.email,
            otp: payload?.otp
        }})
    }

    const handleResendOtp = ()=>{
        dispatch(resendForgotPassOtp({email:location?.state?.email}))
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
                <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Verify OTP</h2>

                <FormGroup>
                    <FormField>
                        <Input
                            name="otp"
                            value={payload?.otp}
                            hint="OTP"
                            handleChange={handleChange}
                            error={errors?.otp}
                        />
                    </FormField>
                </FormGroup>

                <br />

                <Center>
                    <Button
                        name=""
                        title="Next"
                        onClick={handleSubmit}
                    />
                </Center>
                
                <br />
                <Center>
                    <p style={{fontSize: '0.9em'}}>Didn't receive the OTP ? <span style={{cursor: 'pointer', color: 'var(--theme-color-a)'}} onClick={handleResendOtp}>Send again</span></p>
                </Center>
        </Container>
    </Layout>
}

export default VerifyForgotPass;