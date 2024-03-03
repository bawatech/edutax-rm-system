import { useEffect, useMemo, useState } from "react";
import "./style.css";
import "./chat-window.css";
import authService from "../../../service/auth";
import {
  Container,
  FormField,
  FormGroup,
} from "../../../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { showDate } from "../../../utils/formatter";
import { Button } from "../../../components/Button";
import { toastError } from "../../../BTUI/BtToast";

const TaxFileDetails = () => {
  const [details, setDetails] = useState(null);
  const navigate = useNavigate()

  const param = useParams();
  console.log("param", param, "details", details);
  useEffect(() => {
    authService
      .getTaxfileDetails(param?.id)
      .then((res) => {
        console.log('details are ', res?.data)
        setDetails(res?.data?.response);
      })
      .catch((err) => {
        // console.log('Error in taxfiledetail', err)
        // alert(err?.data?.message);
        toastError(err?.data?.message)
      });
  }, []);

  const detailBody = useMemo(() => {
    if (details == null) {
      return <h1>Loading</h1>;
    } else {
      return (
        <>
          <h1 className="tax-file-details-heading">Tax Return File details </h1>
          <br />
          
          <div className="userDetails-section">
            <div className="userDetails-inner-container">

            {details?.taxfile?.file_status === "NEEDS_RESUBMISSION" || details?.taxfile?.file_status === "NEW_REQUEST"  && <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
              <Button 
                varient="small" 
                title="Edit" 
                onClick={()=>navigate(`/user/taxfile/update/${details?.taxfile?.id}`)}
              />
            </div>}
            

              <div className="userDetails-head-content">
                <div className="userDetails-txt-content">
                  <DetailsComponent
                    heading="First Name"
                    value={details?.taxfile?.profile?.firstname}
                  />
                  <DetailsComponent
                    heading="Last Name"
                    value={details?.taxfile?.profile?.lastname}
                  />
                  <DetailsComponent
                    heading="Date of Birth"
                    value={showDate(details?.taxfile?.profile?.date_of_birth)}
                  />
                  <DetailsComponent
                    heading="Marital Status"
                    value={details?.taxfile?.profile?.marital_status_detail?.name}
                  />
                  <DetailsComponent
                    heading="Mobile Number"
                    value={details?.taxfile?.profile?.mobile_number}
                  />
                  <DetailsComponent
                    heading="File Status"
                    value={details?.taxfile?.file_status_name}
                  />
                  <DetailsComponent
                    heading="Moved to Canada"
                    value={details?.taxfile?.moved_to_canada}
                  />
                  <DetailsComponent
                    heading="Date of Entry"
                    value={details?.taxfile?.date_of_entry}
                  />
                </div>
                <div className="userDetails-txt-content">
                  <DetailsComponent
                    heading="Street number"
                    value={details?.taxfile?.profile?.street_number}
                  />
                  <DetailsComponent
                    heading="Street Name"
                    value={details?.taxfile?.profile?.street_name}
                  />
                  <DetailsComponent
                    heading="City"
                    value={details?.taxfile?.profile?.city}
                  />
                  <DetailsComponent
                    heading="Province"
                    value={details?.taxfile?.profile?.province_detail?.name}
                  />
                  <DetailsComponent
                    heading="Postal Code"
                    value={details?.taxfile?.profile?.postal_code}
                  />
                  <DetailsComponent
                    heading="Tax Year"
                    value={details?.taxfile?.tax_year}
                  />
                  <DetailsComponent
                    heading="Direct Deposit CRA"
                    value={details?.taxfile?.direct_deposit_cra}
                  />
                  
                </div>
              </div>

              {(details?.taxfile?.showSingleDocument != false && details?.taxfile?.direct_deposit_cra == "YES") ? <div className="userDetails-img-content">
                <FormField>
                  <FileComponent
                    name="Document (setup or change your direct deposit with CRA) : "
                    download={details?.taxfile?.document_direct_deposit_cra}
                    downloadName={details?.taxfile?.document_direct_deposit_cra}
                    view={details?.taxfile?.document_direct_deposit_cra}
                  />
                </FormField>
              </div>: ''}
              
              <div className="userDetails-img-content">
                  <h4 style={{marginBottom: '-0.5em', fontWeight: '550'}}>Client Uploaded Documents</h4>
                  <hr/>
                  {details?.taxfile?.documents?.map((itm, index) => {
                          return itm?.user_type === "CLIENT" && <FormGroup key={index}>
                              <FormField>
                                  <FileComponent
                                      name={itm?.type?.name || 'Document'}
                                      download={itm?.full_path}
                                      downloadName={itm?.documents?.[index]?.filename}
                                      view={itm?.full_path}
                                  />
                              </FormField>

                          </FormGroup>
                          // : <p style={{color: 'grey'}}>No Record Found</p>
                      })
                  }
              </div>

              {details?.taxfile?.documents?.filter((itm) => itm?.user_type === "EXECUTIVE" ).length>0 && <div className="userDetails-img-content">
                  <h4 style={{marginBottom: '-0.5em', fontWeight: '550'}}>Executive Uploaded Documents</h4>
                  <hr/>
                  {details?.taxfile?.documents?.map((itm, index) => {
                          return itm?.user_type === "EXECUTIVE" && <FormGroup key={index}>
                              <FormField>
                                  <FileComponent
                                      name={itm?.type?.name || 'Document'}
                                      download={itm?.full_path}
                                      downloadName={itm?.documents?.[index]?.filename}
                                      view={itm?.full_path}
                                  />
                              </FormField>

                          </FormGroup>
                          // : <p style={{color: 'grey'}}>No Record Found</p>
                      })
                  }
              </div>}
              
            </div>
          </div>
        </>
      );
    }
  }, [details]);

  return (
      <Container maxWidth="100%">        
        {detailBody}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
  );
};

export default TaxFileDetails;

const DetailsComponent = (props) => {
  return (<div className="details-component-outer-section">
    <div className="details-component-section">
      <label>{props?.heading}</label>
      <p>{props?.value}</p>
    </div>
    <hr />
  </div>
    
  );
};

const FileComponent = (props) => {
  return (
    <div className="file-component-section">
      <div>{props?.name}</div>
      <div className="file-component-btn-div">
        <a
          href={props?.download}
          download={props?.download}
          target="_blank"
          rel="noreferrer"
        >
          <FaDownload />
        </a>
        <a
          href={props?.download}
          target="_blank"
        >
          <IoIosEye />
        </a>
        {/* <a
          href={props?.edit}>
          <Edit />
        </a> */}
      </div>
    </div>
  );
};
