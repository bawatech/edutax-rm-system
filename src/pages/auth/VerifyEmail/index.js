import './style.css';
import { Container, FormField, FormGroup, Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../../store/userSlice';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';

const VerifyEmail = () => {
    const [payload, setPayload] = useState({})
    const [errors, setErrors] = useState({});
    const [loadingButton,setLoadingButton] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(store=>store.user);


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
        dispatch(verifyEmail(payload,user))
            .then(res => {
                toastSuccess(res?.data?.message)
                console.log('ress on verify email',res)
                // setTimeout(()=>{
                    navigate("/user/profile?redirect-type=sign-up")
                // }, 2000);
                
            })
            .catch(err => {
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                }
                toastError(err?.data?.message)
            })
    }

    return <Layout>
        <Container maxWidth="30em">
            {/* <div className="signup-section">
                <div className="signup-inner-container"> */}
                    <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Verify Email Address</h2>

                    <p>Your email is <b> {user?.email}</b></p>
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