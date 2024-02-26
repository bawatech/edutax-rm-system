import { useEffect, useState } from "react";

import "./style.css";
import { useNavigate } from "react-router-dom";
import authService from "../../../service/auth";
import { toastError, toastSuccess } from "../../../BTUI/BtToast";


const Dashboard = () => {
  const [payload, setPayload] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  console.log("PAYLOAD IS ", payload);

  useEffect(() => {

    authService.getTaxfileList().then((res) => {
        if(res?.data?.response?.taxfiles){
          setPayload(res?.data?.response?.taxfiles)
        }
    });
  }, []);

  const handleReturnClick=()=>{
    authService.getTaxfileList().then((res) => {
        console.log('taxfiles here',res?.data?.response)
        const taxfiles = res?.data?.response?.taxfiles || []
        if(taxfiles.length>0){
                navigate(`/user/taxfile/${taxfiles[0]?.id}`)
        }else{
            navigate(`/user/taxfile-add`)
        }
    })
    .catch(err=>{
        toastError(err?.data?.message)
    })
    // if(taxfiles==0){
    //     navigate("/user/taxfiles")
    // }
  }

  return (
    <div className="dashboard">
      <div className="dash-menu">
        <div onClick={() => navigate("/user/profile")}>Profile</div>
        <div onClick={handleReturnClick}>Tax Return</div>
        <div onClick={() => navigate("/user/settings")}>Settings</div>
        <div onClick={() => navigate("/user/invite-spouse")}>Link Spouse</div>
        <div onClick={() => navigate(`/user/taxfile/${payload[0]?.id}#msgDiv`)}>Messages</div>
      </div>
    </div>
  );
};

export default Dashboard;
