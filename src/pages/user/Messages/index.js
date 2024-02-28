import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../../service/auth";
import { useParams } from "react-router-dom";
import { addClientMsg } from "../../../store/userSlice";
import { toastError } from "../../../BTUI/BtToast";
import { IconSendMessage } from "../../../BTUI/Icons";
import { showDatetime } from "../../../utils/formatter";
import { Center, Container } from "../../../components/Form";



const Messages = () => {

    const params = useParams()
    return<Container>
        <Center><h1>Let's Chat</h1></Center>
        <br/>
        <br/>
        <ChatWindow 
            // taxfile_id={params?.id}
        />
    </Container>
}

export default Messages;

const ChatWindow = ({ taxfile_id }) => {
    const [newMessage, setNewMessage] = useState();
    const [messageList, setMessageList] = useState([]);
    const dispatch = useDispatch();
    const ref = useRef();
    
    
    const handleSend = () => {
        if (newMessage?.trim()?.length < 1) {
            return false;
        }
        dispatch(addClientMsg({message:newMessage}))
            .then((res) => {
                console.log(res);
                getMessageList();
                setNewMessage("");
            })
            .catch((err) => {
                console.log(err);
                toastError(err?.data?.message);
            });
    };

    const getMessageList = () => {
        authService.getClientMsg()
            .then((res) => {
                console.log(res);
                setMessageList(res?.data?.response?.messages);
            })
            .catch((err) => {
                console.log('Error in Get Client Messages', err)
                toastError(err?.data?.message);
            });
    };
    
    useEffect(() => {
        getMessageList();
    }, []);

    useEffect(() => {
        const height = ref.current.scrollHeight
        ref?.current?.scrollTo(0, height)
    }, [newMessage, messageList]);

    return (<div className="chat-wrapper-div">
    <span id="msgDiv"></span>
        <div className="chat-wrapper">
            <div ref={ref} className="chat-messages-list">
                {
                messageList.length == 0 ? <p className="chat-start-conv">Have Any Query? Let's Chat</p> : null
                }
                {messageList?.map((msg, index) => {
                if (msg?.user_type === "CLIENT") {
                    return <Sender key={index} msg={msg?.message} time={msg?.added_on} />;
                } else if (msg?.user_type === "EXECUTIVE") {
                    return <Reciever key={index} msg={msg?.message} time={msg?.added_on} />;
                }
                })}
            </div>
            <ChatInput
                name="message"
                value={newMessage}
                hint="write message here"
                handleChange={setNewMessage}
                handleSend={handleSend}
            />
        </div>
        </div>
    );
    };

    export const ChatInput = (props) => {
    return (
        <div className="chat-compose">
            <textarea
            placeholder="Write here..."
            className="chat-input-textarea"
            value={props?.value}
            rows={5}
            onChange={(e) => {
                props?.handleChange(e.target.value);
            }}
            ></textarea>
            <div className="chat-compose-actions-right">
            <IconSendMessage size='40px' color="#2d87ca" onClick={props?.handleSend} />
            </div>
            
        </div>
    );
    };

    ChatInput.defaultProps = {
    type: "text",
    rows: 2,
    cols: 1,
    };

    const Sender = (props) => {
    return (
        <div className="sender-div-section">
        <div className="sender-div">
            <p>{props?.msg}</p>
        </div>
        <div className="sender-time">
            <p>{showDatetime(props?.time)}</p>
        </div>
        </div>
    );
    };

    const Reciever = (props) => {
    return (
        <div className="reciever-div-section">
        <div className="reciever-div">
            <p>{props?.msg}</p>
        </div>
        <div className="reciever-time">
            <p>{showDatetime(props?.time)}</p>
        </div>
        </div>
    );
    };