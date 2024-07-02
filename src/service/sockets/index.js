import { io } from 'socket.io-client';

const socket = io('http://localhost:3011');

export default socket;
