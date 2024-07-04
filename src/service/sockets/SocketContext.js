// import React, { createContext, useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState({});
//   const user = useSelector((store) => store?.user);
//   const user_id = user?.user?.id;

//   useEffect(() => {
//     if (user_id != null) {
//         const newSocket = io("http://localhost:3011"); // Initialize socket
//         setSocket(newSocket); // Store socket in state
  
//         newSocket.on("connect", () => {
//           console.log(`Connected with ID from app start with socket id: ${newSocket.id}`);
//         //   newSocket.emit("register", user_id); // Register only after connection
//         });
  
//         // Handle socket cleanup on unmount
//         return () => newSocket.disconnect();
//       }
//   }, [user_id]);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

// export default SocketContext;