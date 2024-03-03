import './style.css';
import { Center, Container, FormField, FormGroup, Input } from "../../../components/Form";
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../../layouts/Layout';
import { useDispatch } from 'react-redux';
import { setNewPassword } from '../../../store/userSlice';

const NewPassword = () => {
    const [payload, setPayload] = useState({})
    const [errors, setErrors] = useState({});
    const [loadingButton,setLoadingButton] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        setLoadingButton(true)
        if(payload?.newPassword === payload?.confirmPassword){
            dispatch(setNewPassword({
                newPassword: payload?.newPassword,
                email:location?.state?.email,
                otp:location?.state?.otp,
            }))
                .then(res => {
                    alert(res?.data?.message)
                    navigate("/login")
                    setLoadingButton(false)
                })
                .catch(err => {
                    if (err?.data?.field_errors) {
                        console.log(err)
                        setErrors(err?.data?.field_errors)
                    } else {
                        // alert(err?.data?.message)
                    }
                    setLoadingButton(false)
                    alert(err?.data?.message)
                })
        }else{
            setLoadingButton(false)
            setErrors({
                ...errors,
                ['confirmPassword']: 'New password should be equal to confirm password'
            })
        }
        
    }

    console.log("data from verify ", location?.state?.email, location?.state?.otp, payload?.newPassword)

    return <Layout>
        <Container maxWidth="30em">
                <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Set New Password</h2>

                <FormGroup>
                    <FormField>
                        <Input
                            name="newPassword"
                            value={payload?.newPassword}
                            hint="New Password"
                            password
                            handleChange={handleChange}
                            error={errors?.newPassword}
                        />
                    </FormField>
                </FormGroup>
                <FormGroup>
                    <FormField>
                        <Input
                            name="confirmPassword"
                            value={payload?.confirmPassword}
                            hint="Confirm Password"
                            password
                            handleChange={handleChange}
                            error={errors?.confirmPassword}
                        />
                    </FormField>
                </FormGroup>

                <br />
                <Center>
                    <Button
                        name=""
                        title="Set New Password"
                        loading={loadingButton}
                        onClick={handleSubmit}
                    />
                </Center>
                
                <br />
        </Container>
    </Layout>
}

export default NewPassword;