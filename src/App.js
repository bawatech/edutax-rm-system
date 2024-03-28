import "./App.css";
import { BtLoader } from "./BTUI/BtLoader";
import { BtToast } from "./BTUI/BtToast";
import BtRouter from "./routes";

function App() {
  return (
    <>
      <BtLoader/>
      <BtToast/>
      <BtRouter />
    </>
  );
}

export default App;
 