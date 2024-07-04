import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import authService from "../../../service/auth";
import { useParams } from "react-router-dom";
import { addClientMsg } from "../../../store/userSlice";
import { toastError } from "../../../BTUI/BtToast";
import { IconSendMessage } from "../../../BTUI/Icons";
import { showDatetime } from "../../../utils/formatter";
import { Center, Container } from "../../../components/Form";
import { io } from 'socket.io-client';

// import { socket } from '../../../App';
//import socket from '../../../service/sockets';


//   const socket = io('http://localhost:3011');

const Messages = () => {
    const params = useParams()
    return <Container>
        <Center><h1>Let's Chat</h1></Center>
        <br />
        <br />
        <ChatWindow />
    </Container>
}

export default Messages;

const ChatWindow = ({ userId }) => {
    const [newMessage, setNewMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});

    const user = useSelector((store) => store?.user);
    const user_id = parseInt(user?.user?.id) || null;
    const dispatch = useDispatch();
    const ref = useRef();

    const socket = io("http://localhost:3011");

    useEffect(() => {
        let roomData = { user_id: user_id, socket_id: socket.id, room: `company_${user_id}`, user_type: 'CLIENT', in_chat: "YES" };
        socket.emit('register', roomData);
        console.log(`Connected with ID from Chat Screen First Time: ${socket.id}`);

        const handleFocus = () => { 
            socket.emit('focus', {});
        };

        const handleBlur = () => {
            socket.emit('blur', {});
        };

        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('beforeunload', handleBlur);

        socket.on('connect', () => {
            let roomData = { user_id: user_id, socket_id: socket.id, room: `company_${user_id}`, user_type: 'CLIENT', in_chat: "YES" };
            socket.emit('register', roomData);
            console.log(`Connected with ID from Chat Screen on Reconnect: ${socket.id}`);
        });

        socket.on('disconnect', (reason) => {
            //  socket.emit('discon', user_id);
            console.log(`Disconnected: ${reason}`);
        });

        socket.on('message', (data) => {
            getMessageList();
        });

        socket.on('notification', (data) => {
            alert("New Notification Received")
        });
        // socket.on('onlineStatus', (data) => {
        //     setOnlineUsers((prevUsers) => ({
        //         ...prevUsers,
        //         [data.userId]: data.status,
        //     }));
        // });

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('beforeunload', handleBlur);
            socket.off('message');
            // socket.off('onlineStatus');
        };
    }, []);


    useEffect(() => {
        getMessageList();
    }, []);

    const handleSend = () => {
        if (newMessage.trim().length < 1) {
            return false;
        }
        const message = {
            roomId: `company_${user_id}`,
        };
        dispatch(addClientMsg({ message: newMessage }))
            .then((res) => {
                socket.emit('message', message);
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
        const height = ref.current.scrollHeight;
        ref.current.scrollTo(0, height);
    }, [newMessage, messageList]);

    return (
        <div className="chat-wrapper-div">
            <span id="msgDiv"></span>
            <div className="chat-wrapper">
                <div ref={ref} className="chat-messages-list">
                    {messageList.length === 0 && (
                        <p className="chat-start-conv">Start your conversation...</p>
                    )}
                    {messageList?.map((msg, index) => {
                        if (msg?.user_type === "CLIENT") {
                            return <Sender key={index} msg={msg?.message} time={msg?.added_on} />;
                        } else if (msg?.user_type === "EXECUTIVE") {
                            return <Receiver key={index} msg={msg?.message} time={msg?.added_on} />;
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

const ChatInput = ({ value, handleChange, handleSend }) => {
    return (
        <div className="chat-compose">
            <textarea
                placeholder="Write here..."
                className="chat-input-textarea"
                value={value}
                rows={5}
                onChange={(e) => handleChange(e.target.value)}
            ></textarea>
            <div className="chat-compose-actions-right">
                <IconSendMessage size="40px" color="#2d87ca" onClick={handleSend} />
            </div>
        </div>
    );
};

ChatInput.defaultProps = {
    type: "text",
    rows: 2,
    cols: 1,
};

const Sender = ({ msg, time }) => (
    <div className="sender-div-section">
        <div className="sender-div">
            <p>{msg}</p>
        </div>
        <div className="sender-time">
            <p>{showDatetime(time)}</p>
        </div>
    </div>
);

const Receiver = ({ msg, time }) => (
    <div className="receiver-div-section">
        <div className="receiver-div">
            <p>{msg}</p>
        </div>
        <div className="receiver-time">
            <p>{showDatetime(time)}</p>
        </div>
    </div>
);

