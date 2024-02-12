import { useEffect, useState } from "react";
import { ChatInput, ChatLayout, Dropdown, FileUpload, FormField, FormGroup, Input } from "../../components/Form";
import UserLayout from "../UserLayout";
import { Button } from "../../components/Button";
import './style.css'
import { RiDeleteBin6Line } from "react-icons/ri";

const Home = ()=> {

    const [payload, setPayload] = useState({});

    useEffect(()=> {
        if(payload?.documentsArray === undefined){
            setPayload({
                ...payload,
                ['documentsArray']: payload?.documentsArray || [{}]
            });
        }
    },[])

    const handleChange = (name,value)=> {
        setPayload({
            ...payload,
            [name] : value
        })
    }

    const handleAddForm = ()=> {
        let oldArr = [...payload?.documentsArray]
        let newArr = [...oldArr]
        newArr.push({})

        handleChange('documentsArray', newArr)
    }

    const handleChangeArray = (name,value,thisIndex) => {
        let oldArr = [...payload?.documentsArray]
        let curRow = { ...oldArr[thisIndex] }
        curRow[name] = value
        oldArr[thisIndex] = curRow
    
        handleChange('documentsArray',oldArr)
    }

    const handleDeleteArray = (delIndex) => {
        let oldArr = [...payload?.documentsArray]
        handleChange('documentsArray',oldArr?.filter((itm, ind) => {return ind !== delIndex}))
    }
    console.log("Payload",payload)

    const handleChangeFileArray = (name,value,thisIndex) => {
        let oldArr = [...payload?.documentsArray]
        let curRow = { ...oldArr[thisIndex] }
        curRow[name] = value
        oldArr[thisIndex] = curRow
    
        handleChange('documentsArray',oldArr)
    }

    const handleSend = () => {

        let chat = [payload?.chatArray?.message]
        console.log("chat", chat)
        let newChat = [...chat]
        newChat.push({})

        handleChange('chatArray', newChat)
        console.log("chat", newChat)
    }

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
            
            {payload?.documentsArray?.map((itm, index) => {
                return<FormGroup key={index}>
                    <FormField>
                        <Dropdown 
                            label="Document Type"
                            name="docType"
                            selected={itm?.docType}
                            options={{list: documents, name: 'name', value: 'id'}}
                            handleChange={(name,value)=>handleChangeArray(name,value,index)}
                        />
                    </FormField>
                    <FormField>
                        <div className="array-div">
                            <FileUpload
                                label="Choose File"
                                name="chooseFile"
                                fileName={itm?.chooseFile?.name}
                                handleFileChange={(name,value)=>handleChangeFileArray(name,value,index)}
                            />
                            <Button 
                                varient="icon" 
                                title={<RiDeleteBin6Line />} 
                                onClick={()=>handleDeleteArray(index)}/>
                        </div>
                    </FormField>
                    
                </FormGroup>
            })}
            
            <br/>
            <br/>
            <br/>
            <div className="" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                    title="Add More Form"
                    onClick={handleAddForm}
                />
            </div>
            <br/>
            <br/>
            
            <div className="details-chat-section">
                    <div className="details-chat-inner-section">
                        <div className="details-chat-msg-div">
                            <Sender 
                                msg="snvlksdnvlksdnvlk"
                            />
                            <Reciever
                                msg=";svbknkl;vns;kdnvk;sdnv;ksndvkinpirnbpirenpn"
                            />
                            
                        </div>
                        <div className="details-chat-input-div">
                            <ChatInput 
                                name="chatInput"
                                value={payload?.chatInput}
                                hint="write message here"
                                handleChange={handleChange}
                                onClickSend={handleSend}
                            />
                        </div>
                    </div>
                </div>  
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

const Sender = (props) => {

    return<div className='sender-div-section'>
        <div className="sender-div">
            <p>{props?.msg}</p>
        </div>
    </div>
}

const Reciever = (props) => {

    return<div className='reciever-div-section'>
        <div className="reciever-div">
            <p>{props?.msg}</p>
        </div>
    </div>
}