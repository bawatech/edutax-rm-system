import './style.css';
import { Container, Form, FormField, FormGroup, Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../store/userSlice';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';

const Signup = () => {
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
        dispatch(signUp(payload))
            .then(res => {
               // alert(res?.data?.message)
                toastSuccess(res.data?.message)
                navigate("/verify-email")
            })
            .catch(err => {
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                    toastError(err?.data?.field_errors)
                } else {
                    // alert(err?.data?.message)
                    toastError(err?.data?.message)
                }
                // alert(err?.data?.message)
            })
    }

    return <Layout>
            <Container>
                {/* <div className="signup-section">
                    <div className="signup-inner-container"> */}
                        <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Sign Up</h2>

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
                        
                        <FormGroup>
                            <FormField>
                                <Input
                                    name="password"
                                    type="password"
                                    password
                                    value={payload?.password}
                                    hint="Password"
                                    handleChange={handleChange}
                                    error={errors?.password}
                                />
                            </FormField>
                        </FormGroup>
                        <br />
                        <br />
                        
                        <div style={{textAlign: 'center'}}>
                            <Button
                                name="signup"
                                title="Sign Up"
                                onClick={handleSubmit}
                            />
                            <br />
                            <NavLink className="gotoLogin" to="/login">Already have an account?</NavLink>

                        </div>
                    {/* </div>
                </div> */}
            </Container>
    </Layout>
}

export default Signup;