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
    const [loadingButton, setLoadingButton] = useState(false)
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
        setLoadingButton(true)
        dispatch(sendSpouseInvitation(payload))
            .then((res) => {
                toastSuccess(res?.data?.message)
                setLoadingButton(false)
                // setPayload("")
                setToggle(false)
            })
            .catch((err) => {
                toastError(err?.data?.message)
                setLoadingButton(false)
            });
    }
    console.log(payload)

    const spouseLinkStatus = useMemo(()=>{
        if(spouseStatus?.invitation_status === "LINKED"){
            // alert(spouseStatus?.data?.response)
            console.log("Spouse",spouseStatus)
            return <Container>
                <Center>
                    <h1>Your Linked Spouse</h1>
                </Center>
                <br/>
                <br/>
                <div className="spouse-linked-div">
                    <span>{spouseStatus?.spouse_email}</span>

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
                        loading={loadingButton}
                        onClick={handleSubmit}
                    />
                </Center>
            </Container>
        }else if(spouseStatus?.invitation_status === "SENT"){
            // alert(spouseStatus?.data?.response)
            console.log("Spouse SENT", toggle,spouseStatus)
            
            {return <>
                <Center>
                    <h1>Request already send to this email. But not accepted yet </h1>
                </Center>
                <br/>
                <Container maxWidth="30em">
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
                            loading={loadingButton}
                            onClick={handleSubmit}
                        />
                    </Center>
                </Container>
            </>
            }
            
        }else{
            <Container>
                <Center>
                    <p>May Be You are not Logged in or your Session time Out. Please Login Again </p>
                </Center>
            </Container>
        }
    },[spouseStatus, payload, toggle])

    return<>
    {spouseLinkStatus || <Container>
                <Center>
                    <p>May Be You are not logged in or your session time out. Please login again </p>
                </Center>
            </Container>}
    </>
}

export default InviteSpouse;