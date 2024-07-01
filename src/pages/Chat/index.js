import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from "react-redux";
import { addClientMsg } from "../../store/userSlice";
import { toastError } from "../../BTUI/BtToast";
import { IconSendMessage } from "../../BTUI/Icons";
import { showDatetime } from "../../utils/formatter";
import authService from '../../service/auth';
import { Center, Container } from "../../components/Form";
import { useParams } from "react-router-dom";

const socket = io('http://localhost:3011');

const Chat = () => {
    const params = useParams()
    return <Container>
        <Center><h1>Let's Chat</h1></Center>
        <br />
        <br />
        <ChatWindow />
    </Container>
}

export default Chat;

const ChatWindow = ({ userId }) => {
    const [newMessage, setNewMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});

    const dispatch = useDispatch();
    const ref = useRef();
    const fixedUserId = "2";

    useEffect(() => {
        socket.emit('register', fixedUserId);

        socket.on('connect', () => {
            console.log(`Connected with ID: ${socket.id}`);
            socket.emit('register', fixedUserId);
        });

        socket.on('disconnect', (reason) => {
            console.log(`Disconnected: ${reason}`);
        });

        socket.on('message', (data) => {
            setMessageList((prevMessages) => [...prevMessages, data]);
        });

        socket.on('userStatus', (data) => {
            setOnlineUsers((prevUsers) => ({
                ...prevUsers,
                [data.userId]: data.status,
            }));
        });

        return () => {
            socket.off('message');
            socket.off('userStatus');
        };
    }, []);


    // useEffect(() => {
    //     getMessageList();
    // }, []);

    const handleSend = () => {
        if (newMessage.trim().length < 1) {
            return false;
        }
        let message = {
            user_type: "CLIENT",
            senderId: fixedUserId,
            receiverId: "1",
            message: newMessage,
        };
        socket.emit('message', message);
        setNewMessage('');
        setMessageList((prevMessages) => [...prevMessages, message]);
    };

    // const getMessageList = () => {
    //     authService.getClientMsg()
    //         .then((res) => {
    //             console.log(res);
    //             setMessageList(res?.data?.response?.messages);
    //         })
    //         .catch((err) => {
    //             console.log('Error in Get Client Messages', err)
    //             toastError(err?.data?.message);
    //         });
    // };

    useEffect(() => {
        const height = ref.current.scrollHeight;
        ref.current.scrollTo(0, height);
    }, [messageList]);

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
                    value={newMessage}
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

