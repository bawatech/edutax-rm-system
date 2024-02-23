import { useEffect, useMemo, useState } from 'react'
import { Center, Container, FormField, FormGroup, Input } from '../../../components/Form'
import './style.css'
import { Button } from '../../../components/Button'
import { useDispatch } from 'react-redux'
import { sendSpouseInvitation } from '../../../store/userSlice'
import { toastError, toastSuccess } from '../../../BTUI/BtToast'
import authService from '../../../service/auth'
import { Edit, GoUnlinkIcon } from '../../../components/Icon'
import { hideLoader, showLoader } from '../../../BTUI/BtLoader'


const InviteSpouse = () => {
    const [payload, setPayload] = useState({})
    const [spouseStatus, setSpouseStatus] = useState({})
    const [toggle,setToggle] = useState(false);
    const dispatch = useDispatch()

    useEffect(()=>{
        authService.getSpouse()
            .then((res) => {
                console.log("get spouse",res)
                setSpouseStatus(res?.data?.response)
                if(res?.data?.response?.invitation_status === "SENT"){
                    setPayload({
                        ...payload,
                        email: res?.data?.response?.spouse_email})
                }
            })  
            .catch((err) => {
                console.log(err)
                setSpouseStatus(err)
            })
    },[])

    const handleChange = (name, value) =>{
        setPayload({
            ...payload,
            [name]: value
        })
    }

    const handleSubmit = () => {
        showLoader()
        dispatch(sendSpouseInvitation(payload))
            .then((res) => {
                toastSuccess(res?.data?.message)
                hideLoader()
                // setPayload("")
                setToggle(false)
            })
            .catch((err) => {
                toastError(err?.data?.message)
                hideLoader()
            });
    }
    console.log(payload)

    const spouseLinkStatus = useMemo(()=>{
        if(spouseStatus?.invitation_status === "LINKED"){
            // alert(spouseStatus?.data?.response)
            console.log("Spouse",spouseStatus?.data?.response)
            return <Container>
                <Center>
                    <h1>Your Linked Spouse</h1>
                </Center>
                <br/>
                <br/>
                <div className="spouse-linked-div">
                    <span>{spouseStatus?.data?.response?.spouse?.email}</span>

                    <Button title={<GoUnlinkIcon />} varient="icon" onClick={()=>alert("Clicked")} />
                </div>
            </Container>
        }else if(spouseStatus?.invitation_status === "UNLINKED"){
            return <Container maxWidth="30em">
                <Center>
                    <h1>Link Your Spouse</h1>
                </Center>
                <br/>
                <FormGroup>
                    <FormField>
                        <Input 
                            label="Email"
                            name="email"
                            value={payload?.email}
                            handleChange={handleChange}
                        />
                    </FormField>
                </FormGroup>
                <br/>
                <Center>
                    <Button 
                        title="Send Invite"
                        onClick={handleSubmit}
                    />
                </Center>
            </Container>
        }else if(spouseStatus?.invitation_status === "SENT"){
            // alert(spouseStatus?.data?.response)
            console.log("Spouse SENT", toggle,spouseStatus)
            
            {return <Container maxWidth="30em">
            <Center>
                <h1>Request already send to this email. But not accepted yet </h1>
            </Center>
            <br/>
            <FormGroup>
                <FormField>
                    <Input 
                        label="Email"
                        name="email"
                        value={payload?.email}
                        handleChange={handleChange}
                    />
                </FormField>
            </FormGroup>
            <br/>
            <Center>
                <Button 
                    title="Resend Invite"
                    onClick={handleSubmit}
                />
            </Center>
        </Container>}
            
        }
    },[spouseStatus, payload, toggle])

    return<>
    {spouseLinkStatus}
    </>
}

export default InviteSpouse;