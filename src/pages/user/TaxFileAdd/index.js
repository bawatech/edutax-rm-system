import { useEffect, useState } from "react";
import { ChatInput, ChatLayout, Dropdown, FileUpload, FormField, FormGroup, Input, InputDate } from "../../../components/Form";
import { Button } from "../../../components/Button";
import './style.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { addTaxfile } from "../../../store/userSlice";
import { UserLayout } from "../../layouts/Layout";
import { useNavigate } from "react-router-dom";
const TaxFileAdd = () => {

    const [payload, setPayload] = useState({
        documents:[]
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log('PAYLOAD IS ',payload)

    //_____ MOVED TO USE STATE
    // useEffect(() => {
    //     if (payload?.documents === undefined) {
    //         setPayload({
    //             ...payload,
    //             ['documents']: payload?.documents || [{}]
    //         });
    //     }
    // }, [])

    const handleSubmit = () => {
        dispatch(addTaxfile(payload))
            .then(res => {
                console.log('Response', res?.data?.taxfile?.id)
                alert(res?.data?.message)
                navigate(`/user/tax-file-details/${res?.data?.taxfile?.id}`)
            })
            .catch(err => {
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors)
                } else {
                    alert(err?.data?.message)
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
    }

    const handleAddForm = () => {
        let oldArr = [...payload?.documents]
        let newArr = [...oldArr]
        newArr.push({})

        handleChange('documents', newArr)
    }

    const handleChangeArray = (name, value, thisIndex) => {
        let oldArr = [...payload?.documents]
        let curRow = { ...oldArr[thisIndex] }
        curRow[name] = value
        oldArr[thisIndex] = curRow

        handleChange('documents', oldArr)
    }

    const handleDeleteArray = (delIndex) => {
        let oldArr = [...payload?.documents]
        handleChange('documents', oldArr?.filter((itm, ind) => { return ind !== delIndex }))
    }
    console.log("Payload", payload)

    const handleChangeFileArray = (name, value, thisIndex) => {
        let oldArr = [...payload?.documents]
        let curRow = { ...oldArr[thisIndex] }
        curRow[name] = value
        oldArr[thisIndex] = curRow

        handleChange('documents', oldArr)
    }

    

    return <div className="">
        <UserLayout>
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
                    {/* <Input
                        label="Date of Birth"
                        name="date_of_birth"
                        value={payload.date_of_birth}
                        error={errors?.date_of_birth}
                        handleChange={handleChange}
                    /> */}
                </FormField>
                <FormField>
                <Dropdown
                            label="Marital Status"
                            name="marital_status"
                            selected={payload?.marital_status}
                            options={{ list: maritalStatus, name: 'name', value: 'code' }}
                            handleChange={(name, value) => handleChangeArray(name, value)}
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
                            handleChange={(name, value) => handleChangeArray(name, value)}
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

                <FormField>
                    <Input
                        label="Taxyear"
                        name="tax_year"
                        value={payload.tax_year}
                        error={errors?.tax_year}
                        handleChange={handleChange}
                    />
                </FormField>
            </FormGroup>

            {payload?.documents?.map((itm, index) => {
                return <FormGroup key={index}>
                    <FormField>
                        <Dropdown
                            label="Document Type"
                            name="typeid"
                            selected={itm?.typeid}
                            options={{ list: documents, name: 'name', value: 'id' }}
                            handleChange={(name, value) => handleChangeArray(name, value, index)}
                        />
                    </FormField>
                    <FormField>
                        <div className="array-div">
                            <FileUpload
                                label="."
                                name="taxfile"
                                fileName={itm?.taxfile?.name}
                                handleFileChange={(name, value) => handleChangeFileArray(name, value, index)}
                            />
                            <Button
                                varient="icon"
                                title={<RiDeleteBin6Line />}
                                onClick={() => handleDeleteArray(index)} />
                        </div>
                    </FormField>

                </FormGroup>
            })}
            <div className="" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <button
                    style={{padding:'8px'}}
                    onClick={handleAddForm}
                >
                    + Add More Documents
                    </button>
            </div>
            <br />
            <div style={{textAlign:'center'}}>
            <Button
                name="addTaxFile"
                title="Add TaxFile"
                onClick={handleSubmit}
            />
            </div>
            <br />
            
        </UserLayout>
    </div>
}

export default TaxFileAdd;

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
        code: 'MRD',
        name: 'Married',
    },
    {
        code: 'UNM',
        name: 'Un Married',
    }
]

