import { useEffect, useMemo, useState } from 'react'
import './style.css'
import authService from '../../../service/auth'
import { UserLayout } from '../../layouts/Layout'
import { ChatInput } from '../../../components/Form'
import { useParams } from 'react-router-dom'

const TaxFileDetails =()=>{

    const [details, setDetails] = useState(null)
    const param = useParams()
console.log('param',param, 'details',details)
    useEffect(()=>{
        authService.getTaxfileDetails(param?.id)
        .then(res=>{
            console.log('details are ',res?.data)
            setDetails(res?.data)
        })
        .catch(err=>{
            console.log('Error on details',err)
        })
    },[])

    const detailBody = useMemo(()=>{

        if(details==null){
            return <h1>Loading</h1>
        } else {

            return <div>
                <h1>Taxfile details </h1>
                <p>first name : {details?.taxfile?.firstname}</p>
                <p>last name : {details?.taxfile?.lastname}</p>
                <p>city : {details?.taxfile?.city}</p>
            </div>

        }
    },[details])

    return <UserLayout>
        {detailBody}
        <br/>
        <br/>
        <br/>
        <ChatWindow/>
    </UserLayout>

}

export default TaxFileDetails


const ChatWindow = (props) =>{

    const [newMessage,setNewMessage] = useState("")

    const handleSend = () => {
        alert(newMessage)
    }
    return <div className="details-chat-section">
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
                value={newMessage}
                hint="write message here"
                handleChange={(name,value)=>setNewMessage(value)}
                onClickSend={handleSend}
            />
        </div>
    </div>
</div>
}


const Sender = (props) => {

    return <div className='sender-div-section'>
        <div className="sender-div">
            <p>{props?.msg}</p>
        </div>
    </div>
}

const Reciever = (props) => {

    return <div className='reciever-div-section'>
        <div className="reciever-div">
            <p>{props?.msg}</p>
        </div>
    </div>
}