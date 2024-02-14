import { useEffect, useMemo, useState } from 'react'
import './style.css'
import authService from '../../../service/auth'
import { UserLayout } from '../../layouts/Layout'
import { ChatInput, FormField, FormGroup } from '../../../components/Form'
import { useParams } from 'react-router-dom'

const TaxFileDetails = () => {

    const [details, setDetails] = useState(null)
    const param = useParams()

    console.log('param', param, 'details', details)
    useEffect(() => {
        authService.getTaxfileDetails(param?.id)
            .then(res => {
                console.log('details are ', res?.data)
                setDetails(res?.data)
            })
            .catch(err => {
                console.log('Error in taxfiledetail', err)
                alert(err?.data?.message)
            })
    }, [])

    const detailBody = useMemo(() => {

        if (details == null) {
            return <h1>Loading</h1>
        } else {

            return <>
                <h1>Taxfile details </h1>
                <p><b>first name :</b> {details?.taxfile?.firstname}</p>
                <p><b>last name :</b> {details?.taxfile?.lastname}</p>
                <p><b>Date of Birth :</b> {details?.taxfile?.date_of_birth}</p>
                <p><b>Marital Status :</b> {details?.taxfile?.marital_status}</p>
                <p><b>Street Name :</b> {details?.taxfile?.street_name}</p>
                <p><b>City :</b> {details?.taxfile?.city}</p>
                <p><b>Province :</b> {details?.taxfile?.province}</p>
                <p><b>Postal Code :</b> {details?.taxfile?.postal_code}</p>
                <p><b>Mobile Number :</b> {details?.taxfile?.mobile_number}</p>
                <p><b>Tax Year :</b> {details?.taxfile?.tax_year}</p>

                {
                    details?.taxfile?.documents?.map((itm, index) => {
                        return <FormGroup key={index}>
                            <FormField>
                            <b>File : </b><p style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => window.open(itm.full_path, '_blank')}>{itm.full_path}</p>
                            </FormField>

                        </FormGroup>

                    })

                }
            </>
        }
    }, [details])

    return <UserLayout>
        {detailBody}
        <br />
        <br />
        <br />
        <ChatWindow />
    </UserLayout>

}

export default TaxFileDetails


const ChatWindow = (props) => {

    const [newMessage, setNewMessage] = useState("")

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
                    handleChange={(name, value) => setNewMessage(value)}
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