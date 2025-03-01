import { useEffect, useState } from "react";

import "./style.css";
import { useNavigate } from "react-router-dom";
import authService from "../../../service/auth";
import { toastError } from "../../../BTUI/BtToast";
import { IconAddPerson, IconFile, IconMessage, IconProfile, IconSetting } from "../../../BTUI/Icons";


const Dashboard = () => {
  const [payload, setPayload] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {

    authService.getTaxfileList()
      .then((res) => {
          if(res?.data?.response?.taxfiles){
            setPayload(res?.data?.response?.taxfiles)
          }
      })
      .catch((err) => {
        
      })
  }, []);

  console.log("Dashboard",payload)

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
        <div onClick={() => navigate("/user/profile")}><IconProfile color="var(--pri-color)" style={{fontSize: '3em'}}/> Profile</div>
        <div onClick={handleReturnClick}><IconFile color="var(--pri-color)" style={{fontSize: '3em'}}/> Tax Return ( YR-2024 )</div>
        <div onClick={() => navigate("/user/settings")}><IconSetting color="var(--pri-color)" style={{fontSize: '3em'}}/>Settings</div>
        <div onClick={() => navigate("/user/invite-spouse")}><IconAddPerson color="var(--pri-color)" style={{fontSize: '3em'}}/>Link Spouse</div>
        <div onClick={() => navigate(`/user/messages`)}><IconMessage color="var(--pri-color)" style={{fontSize: '3em'}}/>Messages</div>
      </div>
    </div>
  );
};

export default Dashboard;
