

import { useEffect, useMemo, useState } from 'react'
import './style.css'
import authService from '../../../service/auth'
import { UserLayout } from '../../layouts/Layout'
import { ChatInput, Container, FormField, FormGroup } from '../../../components/Form'
import { useParams } from 'react-router-dom'
import { FaDownload } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { useDispatch } from 'react-redux'
import { addClientMessage } from '../../../store/userSlice'
import { toastError } from '../../../BTUI/BtToast'
import { MdEdit } from "react-icons/md";


const TaxFileDetails = () => {

    const [details, setDetails] = useState(null)
    const [chatMsg, setChatMsg] = useState([])
    const [reload, setReload] = useState(false);
    const param = useParams()
    const dispatch = useDispatch()

    // console.log('param', param, 'details', details)
    useEffect(() => {
        authService.getTaxfileDetails(param?.id)
            .then(res => {
                //  console.log('details are ', res?.data)
                setDetails(res?.data)
            })
            .catch(err => {
                // console.log('Error in taxfiledetail', err)
                alert(err?.data?.message)
            })
    }, [])

    useEffect(() => {
        authService.getClientMessages(param?.id)
            .then(res => {
                // console.log('Client messages are ', res?.data)
                // console.log('Client messages are ', res?.data?.response?.messages)
                // setDetails(res?.data)
                setChatMsg(res?.data?.response?.messages)
            })
            .catch(err => {
                // console.log('Error in Get Client Messages', err)
                alert(err?.data?.message)
            })
    }, [reload])

    // console.log('payload', payload)

    const detailBody = useMemo(() => {

        if (details == null) {
            return <h1>Loading</h1>
        } else {

            return <>
                <h1 className="tax-file-details-heading">Taxfile details </h1>
                <br />
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
                                    heading="Tax Year"
                                    value={details?.taxfile?.tax_year}
                                />
                            </div>
                        </div>

                        <div className="userDetails-img-content">
                            <FormField>
                                <FileComponent
                                    name="Document (setup or change your direct deposit with CRA) : "
                                    download={details?.taxfile?.document_direct_deposit_cra}
                                    downloadName={details?.taxfile?.document_direct_deposit_cra}
                                    view={details?.taxfile?.document_direct_deposit_cra}
                                />
                            </FormField>
                        </div>


                        <div className="userDetails-img-content">
                            {
                                details?.taxfile?.documents?.map((itm, index) => {
                                    return <FormGroup key={index}>
                                        <FormField>
                                            <FileComponent
                                                name="File : "
                                                download={itm?.full_path}
                                                downloadName={itm?.documents?.[index]?.filename}
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
        <Container>
            {detailBody}
            <br />
            <br />
            <br />
            <ChatWindow
                chatMsg={chatMsg}
                taxfile_id={param?.id}
            />
            <br />
            <br />
            <br />
        </Container>
        
    </UserLayout>

}

export default TaxFileDetails


const ChatWindow = ({ taxfile_id }) => {
    const [newMessage, setNewMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const dispatch = useDispatch()

    const handleChange = (name,value) => {
        setNewMessage({
            ...newMessage,
            [name] : value,
            taxfile_id: taxfile_id
        })
    }

    const handleSend = () => {
        // if (newMessage?.trim()?.length < 1) {
        //     return false;
        // }
        dispatch(addClientMessage(newMessage))
            .then((res) => {
                getMessageList()
                setNewMessage("")
            })
            .catch((err) => {
                toastError(err?.data?.message)
            })
    }

    const getMessageList = () => {
        authService.getClientMessages(taxfile_id)
            .then(res => {
                // console.log('Client messages are ', res?.data)
                // console.log('Client messages are ', res?.data?.response?.messages)
                // setDetails(res?.data)
                setMessageList(res?.data?.response?.messages)
            })
            .catch(err => {
                // console.log('Error in Get Client Messages', err)
                toastError(err?.data?.message)
            })
    }
    useEffect(() => {
        getMessageList()
    }, [])


    return <div className="details-chat-section">
        <div className="details-chat-inner-section">
            <div className="details-chat-msg-div">
                {messageList?.map((msg, index) => {
                    //  console.log("mmeeeeeeeeeeeemememememememe", msg?.user_type)

                    if (msg?.user_type === "CLIENT") {
                        return <Sender
                            msg={msg?.message}
                            time={msg?.added_on}
                        />
                    } else if (msg?.user_type === "EXECUTIVE") {
                        return <Reciever
                            msg={msg?.message}
                            time={msg?.added_on}
                        />
                    }
                })}


            </div>
            <div className="details-chat-input-div">
                <ChatInput
                    name="message"
                    value={newMessage?.message}
                    hint="write message here"
                    handleChange={handleChange}
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
        <div className="sender-time">
            <p>{props?.time}</p>
        </div>
    </div>
}

const Reciever = (props) => {

    return <div className='reciever-div-section'>
        <div className="reciever-div">
            <p>{props?.msg}</p>
        </div>
        <div className="reciever-time">
            <p>{props?.time}</p>
        </div>
    </div>
}

const DetailsComponent = (props) => {

    return <div className="details-component-section">
        <label>
            {props?.heading}
        </label>
        <p>{props?.value}</p>
    </div>
}

const FileComponent = (props) => {

    return <div className="file-component-section">
        <label>
            {props?.name}
        </label>
        <div className="file-component-btn-div">
            <a href={props?.download} download={props?.downloadName} target="_blank" rel="noreferrer"><FaDownload /></a>
            <a href="" onClick={() => { window.open(props?.view, "_blank") }}><IoIosEye /></a>
            <a href="" onClick=""><MdEdit /></a>
        </div>
    </div>
}

