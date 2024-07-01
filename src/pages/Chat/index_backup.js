import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3011');

const Chat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    socket.emit('register', "2");

    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
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
  }, [userId]);

  const sendMessage = () => {
    socket.emit('message', {
      senderId: "2",
      receiverId: "1", // assuming admin has a fixed ID
      message: input,
    });
    setInput('');
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div>
        Online Users:
        {Object.keys(onlineUsers).map((user) => (
          <div key={user}>
            {user}: {onlineUsers[user]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
