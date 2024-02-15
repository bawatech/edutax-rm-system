import { useEffect, useMemo, useState } from 'react'
import './style.css'
import authService from '../../../service/auth'
import { UserLayout } from '../../layouts/Layout'
import { ChatInput, FormField, FormGroup } from '../../../components/Form'
import { useParams } from 'react-router-dom'
import { FaDownload } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { Button } from '../../../components/Button'


const TaxFileDetails = () => {

    const [details, setDetails] = useState(null)
    const [payload, setPayload] = useState({});
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

    useEffect(() => {
        authService.getClientMessages(param?.id)
            .then(res => {
                console.log('Client messages are ', res?.data)
                // setDetails(res?.data)
            })
            .catch(err => {
                console.log('Error in Get Client Messages', err)
                alert(err?.data?.message)
            })
    }, [])

    const detailBody = useMemo(() => {

        if (details == null) {
            return <h1>Loading</h1>
        } else {

            return <>
                <h1>Taxfile details </h1>
                <br/>
                <div className="userDetails-section">
            <div className="userDetails-inner-container">
                <div className='userDetails-head-content'>
                    <div className="userDetails-txt-content">
                        <DetailsComponent
                            heading="First Name"
                            value={details?.taxfile?.firstname}
                        />
                        <DetailsComponent 
                            heading="Last Name"
                            value={details?.taxfile?.lastname}
                        />
                        <DetailsComponent 
                            heading="Date of Birth"
                            value={details?.taxfile?.date_of_birth}
                        />
                        <DetailsComponent 
                            heading="Marital Status"
                            value={details?.taxfile?.marital_status}
                        />
                        <DetailsComponent 
                            heading="Mobile Number"
                            value={details?.taxfile?.mobile_number}
                        />
                    </div>
                    <div className="userDetails-txt-content">
                        <DetailsComponent 
                            heading="Street Name"
                            value={details?.taxfile?.street_name}
                        />
                        <DetailsComponent 
                            heading="City"
                            value={details?.taxfile?.city}
                        />
                        <DetailsComponent 
                            heading="Province"
                            value={details?.taxfile?.province}
                        />
                        <DetailsComponent 
                            heading="Postal Code"
                            value={details?.taxfile?.postal_code}
                        />
                        <DetailsComponent 
                            heading="Postal Code"
                            value={details?.taxfile?.tax_year}
                        />
                    </div>
                </div>
                <div className="userDetails-img-content">
                {
                    details?.taxfile?.documents?.map((itm, index) => {
                        return <FormGroup key={index}>
                            <FormField>
                            <FileComponent 
                                name="File"
                                download={itm?.full_path}
                                downloadType={itm?.documents?.[index]?.filename}
                                view={itm?.full_path}
                            />
                            </FormField>

                        </FormGroup>

                    })

                }
                </div>
            </div>
        </div>
                
            </>
        }
    }, [details])

    return <UserLayout>
        {detailBody}
        <br />
        <br />
        <br />
        <ChatWindow />
        <br />
        <br />
        <br />
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

const DetailsComponent = (props) => {

    return<div className="details-component-section">
        <label>
            {props?.heading}
        </label>
        <p>{props?.value}</p>
    </div>
}

const FileComponent = (props) => {

    return<div className="file-component-section">
        <label>
            {props?.name}
        </label>
        <div className="file-component-btn-div">
            <a href={props?.download} download={props?.downloadName} target="_blank" rel="noreferrer"><FaDownload /></a>
            <a href="" onClick={()=>{window.open(props?.view, "_blank")}}><IoIosEye /></a>
        </div>
    </div>
}

