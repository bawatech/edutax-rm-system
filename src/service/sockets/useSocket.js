// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import io from "socket.io-client";
// import { toNull } from "../../utils/commonFunctions";

// export const useSocket = () => {
//   const [socket, setSocket] = useState({});
//   const user = useSelector((store) => store?.user);
//   const user_id = user?.user?.id;

//   useEffect(() => {
//     if (toNull(user_id) != null) {
//         const newSocket = io("http://localhost:3011"); // Initialize socket
//         setSocket(newSocket); // Store socket in state
  
//         newSocket.on("connect", () => {
//           console.log(`Connected with ID from App.js with socket id: ${newSocket.id}`);
//           newSocket.emit("register", user_id); // Register only after connection
//         });
  
//         // Handle socket cleanup on unmount
//         return () => newSocket.disconnect();
//       }else{
//         return null;
//       }
//   }, [user_id]);

//   return socket;
// };