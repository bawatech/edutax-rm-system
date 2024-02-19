import { useEffect, useState } from "react";

import "./style.css";
import { useNavigate } from "react-router-dom";
import authService from "../../../service/auth";
import { toastError, toastSuccess } from "../../../BTUI/BtToast";
const Dashboard = () => {
  const [payload, setPayload] = useState({});
  const [errors, setErrors] = useState({});
//   const [taxfiles, setTaxfiles] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const navigate = useNavigate();

  console.log("PAYLOAD IS ", payload);

  useEffect(() => {
    authService.getMaritalStatus().then((res) => {
      setMaritalStatus(res?.data?.response?.maritalStatusList);
      console.log("marital Status", res?.data?.response);
    })
    .catch(err=>{
      toastError(err?.data?.message)
    })

    // authService.getTaxfileList().then((res) => {
    //     if(res?.data?.response?.taxfiles){
    //         setTaxfiles(res?.data?.response?.taxfiles)
    //     }
    // });
  }, []);

  const handleReturnClick=()=>{
    authService.getTaxfileList().then((res) => {
        console.log('taxfiles here',res?.data?.response)
        const taxfiles = res?.data?.response?.taxfiles || []
        if(taxfiles.length>0){
                navigate(`/user/taxfile-details/${taxfiles[0]?.id}`)
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

  const handleSubmit = () => {
    authService
      .createProfile(payload)
      .then((res) => {
        console.log("Response", res?.data?.taxfile?.id);
        // alert(res?.data?.message)
        toastSuccess(res?.data?.message);
        navigate(`/user/tax-file-add`);
      })
      .catch((err) => {
        if (err?.data?.field_errors) {
          setErrors(err?.data?.field_errors);
          toastError(err?.data?.field_errors);
        } else {
          // alert(err?.data?.message)
          toastError(err?.data?.message);
        }
        // alert(err?.data?.message)
        toastError(err?.data?.message);
      });
  };

  const handleChange = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: null,
    });
  };

  return (
    <div className="dashboard">
      <div className="dash-menu">
        <div onClick={() => navigate("/user/profile")}>Profile</div>
        <div onClick={handleReturnClick}>Tax Return</div>
        <div onClick={() => navigate("/user/settings")}>Settings</div>
        <div onClick={() => navigate("/user/invite-spouse")}>Link Spouse</div>
      </div>
    </div>
  );
};

export default Dashboard;
