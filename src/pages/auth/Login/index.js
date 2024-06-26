import './style.css';
import { Container, FormField, FormGroup, Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/userSlice';
import { Layout } from '../../layouts/Layout';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';



const Login = () => {
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
        setLoadingButton(true)
        dispatch(login(payload))
            .then(res => {
                toastSuccess(res?.data?.message)
                console.log("login",res)
                if(res?.data?.response?.user?.verify_status === "VERIFIED"){
                    navigate("/user")
                }else{
                    navigate("/verify-email", {state: { data: payload?.email }})
                }
                
            })
            .catch(err => {
            
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                    toastError(err?.data?.message)
                } else {
                    toastError(err?.data?.message)
                }
                
            })
            .finally(() => setLoadingButton(false))
    }

    return <Layout>
            <Container maxWidth="30em">
                <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Log In</h2>

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

                <div className='forgot-div'>
                    <NavLink className="gotoForgot" to="/reset">Forgot password?</NavLink>
                </div>
                <br />

                <div style={{textAlign: 'center'}}>
                    <Button
                        name="login"
                        title="Login"
                        loading={loadingButton}
                        loadingText="Logging In..."
                        onClick={handleSubmit}
                    />
                    <br />
                    <NavLink className="gotoSignup" to="/qna-verify">Don't have an account?</NavLink>
                </div>
                
            </Container>
            {/* </div>
        </div> */}
    </Layout>
}

export default Login;