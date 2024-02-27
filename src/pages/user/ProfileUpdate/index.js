import { useEffect, useState } from "react";
import {Container, Dropdown, Form, FormField, FormGroup, FormName, Input, InputDate } from "../../../components/Form";
import { Button } from "../../../components/Button";
import './style.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import authService from "../../../service/auth";
import { toastError, toastSuccess } from "../../../BTUI/BtToast";




const ProfileUpdate = () => {

    const [payload, setPayload] = useState({});
    const [errors, setErrors] = useState({});
    const [maritalStatus, setMaritalStatus] = useState([]);
    const [province, setProvince] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log('PAYLOAD IS ', payload)

    useEffect(() => {
        authService?.getMaritalStatus()
            .then((res) => {
                setMaritalStatus(res?.data?.response?.maritalStatusList)
                console.log("marital Status", res?.data?.response)
            })

        authService?.getProvinces()
            .then((res) => {
                setProvince(res?.data?.response?.provincesList)
                console.log("marital Status", res?.data?.response)
            })
    },[])

    const handleSubmit = () => {

        authService?.updateProfile(payload)
            .then(res => {
                console.log('Response', res?.data?.taxfile?.id)
                // alert(res?.data?.message)
                toastSuccess(res?.data?.message)
                navigate(`/user`)
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
                toastError(err?.data?.message)
            })
    }
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



    return <div className="">
        <Container>
            <Form>
                <FormName name="Profile" />
                <FormGroup>
                    <FormField>
                        <Input
                            label="First Name"
                            name="firstname"
                            value={payload?.firstname}
                            error={errors?.firstname}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Last Name"
                            name="lastname"
                            value={payload?.lastname}
                            error={errors?.lastname}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <InputDate
                            label="Date of Birth"
                            name="date_of_birth"
                            value={payload?.date_of_birth}
                            error={errors?.date_of_birth}
                            handleChange={handleChange}
                            openToDate={new Date(2000,0,1)}
                        />

                    </FormField>
                    <FormField>
                        <Dropdown
                            label="Marital Status"
                            name="marital_status"
                            selected={payload?.marital_status}
                            options={{ list: maritalStatus, name: 'name', value: 'code' }}
                            error={errors?.marital_status}
                            // handleChange={(name, value) => handleChangeArray(name, value)}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Street Number"
                            name="street_number"
                            value={payload?.street_number}
                            error={errors?.street_number}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Street Name"
                            name="street_name"
                            value={payload?.street_name}
                            error={errors?.street_name}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="City"
                            name="city"
                            value={payload?.city}
                            error={errors?.city}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Dropdown
                            label="Province"
                            name="province"
                            selected={payload?.province}
                            options={{ list: province, name: 'name', value: 'code' }}
                            handleChange={handleChange}
                            error={errors?.province}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Postal Code"
                            name="postal_code"
                            value={payload?.postal_code}
                            error={errors?.postal_code}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Mobile Number"
                            name="mobile_number"
                            value={payload?.mobile_number}
                            error={errors?.mobile_number}
                            handleChange={handleChange}
                        />
                    </FormField>
                    {/* <FormField>
                        <Input
                            label="SIN"
                            name="sin"
                            password
                            value={payload?.sin}
                            error={errors?.sin}
                            handleChange={handleChange}
                        />
                    </FormField> */}

                </FormGroup>

                <br />
                <div style={{ textAlign: 'center' }}>
                    <Button
                        name="createProfile"
                        title="Save"
                        onClick={handleSubmit}
                    />
                </div>
                <br />
            </Form>
        </Container>
    </div>
}

export default ProfileUpdate;

