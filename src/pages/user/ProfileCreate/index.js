import { useEffect, useState } from "react";
import { ChatInput, ChatLayout, Dropdown, FileUpload, Form, FormField, FormGroup, FormName, Input, InputDate } from "../../../components/Form";
import { Button } from "../../../components/Button";
import './style.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { addTaxfile } from "../../../store/userSlice";
import { UserLayout } from "../../layouts/Layout";
import { useNavigate } from "react-router-dom";
import authService from "../../../service/auth";
const ProfileCreate = () => {

    const [payload, setPayload] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log('PAYLOAD IS ', payload)


    const handleSubmit = () => {

        authService.createProfile(payload)
            .then(res => {
                console.log('Response', res?.data?.taxfile?.id)
                alert(res?.data?.message)
                navigate(`/user/tax-file-add`)
            })
            .catch(err => {
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                } else {
                    // alert(err?.data?.message)
                }
                console.log('Error', err)
                alert(err?.data?.message)
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
        <UserLayout>
            <Form>
                <FormName name="Create Profile" />
                <FormGroup>
                    <FormField>
                        <Input
                            label="First Name"
                            name="firstname"
                            value={payload.firstname}
                            error={errors?.firstname}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Last Name"
                            name="lastname"
                            value={payload.lastname}
                            error={errors?.lastname}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <InputDate
                            label="Date of Birth"
                            name="date_of_birth"
                            value={payload.date_of_birth}
                            error={errors?.date_of_birth}
                            handleChange={handleChange}
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
                            label="Street Name"
                            name="street_name"
                            value={payload.street_name}
                            error={errors?.street_name}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="City"
                            name="city"
                            value={payload.city}
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
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Postal Code"
                            name="postal_code"
                            value={payload.postal_code}
                            error={errors?.postal_code}
                            handleChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <Input
                            label="Mobile Number"
                            name="mobile_number"
                            value={payload.mobile_number}
                            error={errors?.mobile_number}
                            handleChange={handleChange}
                        />
                    </FormField>

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

        </UserLayout>
    </div>
}

export default ProfileCreate;

const documents = [
    {
        id: '1',
        name: 'Driving License',
    },
    {
        id: '2',
        name: 'Aadhar Card',
    },
    {
        id: '3',
        name: 'Voter Card',
    },
    {
        id: '4',
        name: 'PAN Card',
    },
    {
        id: '5',
        name: 'Passport',
    },
]

const maritalStatus = [
    {
        code: 'MRD',
        name: 'Married',
    },
    {
        code: 'UNM',
        name: 'Un Married',
    }
]

const province = [
    {
        code: 'ON',
        name: 'Ontario',
    },
    {
        code: 'QC',
        name: 'Quebec',
    }
]

