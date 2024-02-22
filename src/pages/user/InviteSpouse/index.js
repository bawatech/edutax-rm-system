import { useEffect, useMemo, useState } from 'react'
import { Center, Container, FormField, FormGroup, Input } from '../../../components/Form'
import './style.css'
import { Button } from '../../../components/Button'
import { useDispatch } from 'react-redux'
import { sendSpouseInvitation } from '../../../store/userSlice'
import { toastError, toastSuccess } from '../../../BTUI/BtToast'
import authService from '../../../service/auth'
import { GoUnlinkIcon } from '../../../components/Icon'


const InviteSpouse = () => {
    const [payload, setPayload] = useState({})
    const [spouseStatus, setSpouseStatus] = useState({})
    const dispatch = useDispatch()

    useEffect(()=>{
        authService.getSpouse()
            .then((res) => {
                console.log(res)
                setSpouseStatus(res)
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
        dispatch(sendSpouseInvitation(payload))
            .then((res) => {
                toastSuccess(res?.data?.message)
            })
            .catch((err) => {
                toastError(err?.data?.message)
            });
    }
    console.log(payload)

    const spouseLinkStatus = useMemo(()=>{
        if(spouseStatus?.status === 200){
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
        }else if(spouseStatus?.status === 400){
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

        }
    },[spouseStatus, payload])

    return<>
    {spouseLinkStatus}
    </>
}

export default InviteSpouse;