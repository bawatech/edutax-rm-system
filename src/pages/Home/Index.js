import { useEffect, useState } from "react";
import { Dropdown, FileUpload, FormField, FormGroup, Input } from "../../components/Form";
import UserLayout from "../UserLayout";
import { Button } from "../../components/Button";



const Home = ()=> {

    const [payload, setPayload] = useState({});
    const [otherFields, setOtherFields] = useState({});


    useEffect(() => {
        setOtherFields(
            documents?.filter((ofiled) => payload[ofiled?.name] !== undefined)
        );
        }, [payload?.docType]);

        const handleOtherFiledAdd = (name, value) => {
            handleChange(value, null);
        };

        const handleOtherFiledDelete = (key,name) => {
            let curInstance = { ...payload };
            delete curInstance[key];

            setPayload({
                ...payload,
                [name] : curInstance
            })
        };

    const handleChange = (name,value)=> {
        setPayload({
            ...payload,
            [name] : value
        })
    }
    console.log("Payload",payload)

    return<div className="">
        <UserLayout>
            <FormGroup>
                <FormField>
                    <Input 
                        label="First Name"
                        name="firstName"
                        value={payload.firstName}
                        handleChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Input 
                        label="Last Name"
                        name="lastName"
                        value={payload.lastName}
                        handleChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Input 
                        label="Date of Birth"
                        name="dob"
                        value={payload.dob}
                        handleChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Input 
                        label="Marital Status"
                        name="maritalStatus"
                        value={payload.maritalStatus}
                        handleChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Input 
                        label="Street Name"
                        name="streetName"
                        value={payload.streetName}
                        handleChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Input 
                        label="City"
                        name="city"
                        value={payload.city}
                        handleChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Input 
                        label="Provision"
                        name="provision"
                        value={payload.provision}
                        handleChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Input 
                        label="Postal Code"
                        name="postalCode"
                        value={payload.postalCode}
                        handleChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Input 
                        label="Mobile Number"
                        name="mobile"
                        value={payload.mobile}
                        handleChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Dropdown 
                        label="Select your document type"
                        name="docType"
                        selected={payload.docType}
                        options={{list: documents, name: 'name', value: 'id'}}
                        handleChange={handleChange}
                    />
                </FormField>
                {documents?.map((oField) => {
                return (
                    <FormField key={oField}>
                        <Input
                            label={oField?.name}
                            value={payload?.[oField?.name]}
                            name={oField?.name}
                            handleChange={handleChange}
                            onDelete={() => handleOtherFiledDelete(oField?.name)}
                        />
                    </FormField>
                    );
                })}

                <FormField>
                    <Dropdown
                        label="docType"
                        name="docType"
                        options={{
                            list: documents?.filter(
                            (thisItm) => payload[thisItm.name] === undefined
                            ),
                            value: "id",
                            name: "name",
                        }}
                        selected="" 
                        handleChange={handleOtherFiledAdd}
                    />
                </FormField>
                <FormField >
                    <FileUpload 
                        label="choose your file"
                    />
                </FormField>
            </FormGroup>

            

            <br/>
            <br/>
            <br/>

            {/* <Button 
                title="Add More Form"
            /> */}
        </UserLayout>
    </div>
}

export default Home;

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