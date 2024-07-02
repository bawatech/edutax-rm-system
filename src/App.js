import { useSelector } from "react-redux";
import "./App.css";
import { BtLoader } from "./BTUI/BtLoader";
import { BtToast } from "./BTUI/BtToast";
import BtRouter from "./routes";
import { toNull } from "./utils/commonFunctions";
import socket from "./service/sockets";

function App() {
  const user = useSelector((store) => store?.user);
  const user_id = user?.user?.id;
  if (toNull(user_id) != null) {
    socket.emit('register', user_id);
  }
  
  return (
    <>
      <BtLoader />
      <BtToast />
      <BtRouter />
    </>
  );
}

export default App;
