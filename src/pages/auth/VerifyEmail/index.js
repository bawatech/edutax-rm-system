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
                navigate("/user/profile-create")
            })
            .catch(err => {
                if (err?.data?.field_errors) {
                    toastError(err?.data?.field_errors)
                    setErrors(err?.data?.field_errors)
                } else {
                   // alert(err?.data?.message)
                }
                toastError(err?.data?.message)
            })
    }

    return <Layout>
        <Container>
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