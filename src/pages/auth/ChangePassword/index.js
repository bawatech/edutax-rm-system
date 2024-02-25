import { useState } from 'react';
import { Container, FormField, FormGroup, Input } from '../../../components/Form';
import './style.css';
import { Button } from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../../store/userSlice';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';



const ChangePassword = (props) => {

    const [payload, setPayload] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()

    const handleChange = (name, value) => {
        setPayload({
            ...payload,
            [name] : value
        })
        setErrors({
            ...errors,
            [name]: null
        })
    }

    const handleSubmit = ()=>{
        if(payload?.confirmNewPassword === payload?.newPassword){
            dispatch(updatePassword(payload))
                .then((res) => {
                    console.log("success",res)
                    toastSuccess(res?.data?.message)
                    setPayload('')
                })
                .catch((err) => {
                    console.log("error",err)
                    toastError(err?.data?.message)
                });
        }else{
            toastError("confirm Password should be matched with new password")
        }
    }

    return <Container maxWidth="30em">
                <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Change Password</h2>

                {/* <FormGroup>
                    <FormField>
                        <Input
                            name="oldPassword"
                            type="password"
                            password
                            value={payload.oldPassword}
                            hint="Old Password"
                            handleChange={handleChange}
                            error={errors?.oldPassword}
                        />
                    </FormField>
                </FormGroup> */}
                <FormGroup>
                    <FormField>
                        <Input
                            name="newPassword"
                            type="password"
                            password
                            value={payload.newPassword}
                            hint="New Password"
                            handleChange={handleChange}
                            error={errors?.newPassword}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            name="confirmNewPassword"
                            type="password"
                            password
                            value={payload.confirmNewPassword}
                            hint="Confirm New Password"
                            handleChange={handleChange}
                            error={errors?.confirmNewPassword}
                        />
                    </FormField>
                </FormGroup>
                <br />
                <div className="" style={{width: '100%', textAlign: 'center'}}>
                    <Button
                        name="getOtp"
                        title="Change Password"
                        onClick={handleSubmit}
                    />
                </div>
                <br />
            </Container>
}

export default ChangePassword