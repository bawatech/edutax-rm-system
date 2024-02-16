import { useState } from 'react';
import { Input } from '../../../components/Form';
import { Layout } from '../../layouts/Layout';
import './style.css';
import { Button } from '../../../components/Button';



const ChangePassword = (props) => {

    const [payload, setPayload] = useState({});
    const [errors, setErrors] = useState({});

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

    return<Layout>
        <div className="change-password-section">
            <div className="change-password-inner-container">
                <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Change Password</h2>

                <Input
                    name="oldPassword"
                    type="password"
                    password
                    value={payload.oldPassword}
                    hint="Old Password"
                    handleChange={handleChange}
                    error={errors?.oldPassword}
                />

                <Input
                    name="newPassword"
                    type="password"
                    password
                    value={payload.newPassword}
                    hint="New Password"
                    handleChange={handleChange}
                    error={errors?.newPassword}
                />

                <Input
                    name="confirmNewPassword"
                    type="password"
                    password
                    value={payload.confirmNewPassword}
                    hint="Confirm New Password"
                    handleChange={handleChange}
                    error={errors?.confirmNewPassword}
                />


                <br />
                <div className="" style={{width: '100%', textAlign: 'center'}}>
                    <Button
                        name="getOtp"
                        title="Get Otp"
                        // onClick={handleSubmit}
                    />
                </div>
                
                <br />
            </div>
        </div>
    </Layout>
}

export default ChangePassword