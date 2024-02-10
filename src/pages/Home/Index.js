import { useState } from "react";
import { FormField, FormGroup, Input } from "../../components/Form";
import UserLayout from "../UserLayout";
import { Button } from "../../components/Button";



const Home = ()=> {

    const [payload, setPayload] = useState({});

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

            </FormGroup>

            <br/>
            <br/>
            <br/>

            <Button 
                title="Add More Form"
            />
        </UserLayout>
    </div>
}

export default Home;