
import { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { Container, Dropdown, FileUpload, Form, FormField, FormGroup, FormName, FormSectionName, InputDate, LabelYesNo } from '../../../components/Form';

import './style.css'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../../../service/auth';
import { hideLoader, showLoader } from '../../../BTUI/BtLoader';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';
import { updateTaxfile } from '../../../store/userSlice';
import { IconDelete } from '../../../components/Icon';


const TaxFileUpdate = () => {
    const param = useParams();
    const [payload, setPayload] = useState({
    documents: [
        {}
    ],
    taxfile_id: param?.id
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([])
    const [docType, setDocType] = useState([])
    const [oldDocs, setOldDocs] = useState([])
    const [newDocs, setNewDoc] = useState({
        documents: [
            {}
        ],
    })
    

    
    useEffect(()=>{
        authService.getProvinces()
            .then((res)=>{
                setProvinces(res?.data?.response?.provincesList)
                console.log(res)
            })
            .catch((err)=>{
                
                console.log(err)
            });
    },[])

    useEffect(()=>{
        authService.getDocumentTypes()
            .then((res)=>{
                setDocType(res?.data?.response?.documentTypesList)
                console.log(res)
            })
            .catch((err)=>{
                
                console.log(err)
            });
    },[])

    useEffect(()=> {
        authService.getTaxfileDetails(param?.id)
            .then((res) => {
                console.log("Taxfile List",res)
                setPayload(res?.data?.response?.taxfile)
                setOldDocs(res?.data?.response?.taxfile?.documents)
            })
            .catch((err)=>{
                console.log("Taxfile List",err)
            });
    },[])

    const handleSubmit = () => {
        showLoader()
        dispatch(updateTaxfile(payload))
            .then((res) => {
                // console.log("Response", res?.data?.taxfile?.id);
                toastSuccess(res?.data?.message);
                hideLoader()
                navigate(`/user/taxfile/${res?.data?.response?.taxfile?.id}`);
            })
            .catch((err) => {
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors);
                } else {
                    toastError(err?.data?.message)
                }
                hideLoader()
            });
    };

    useEffect(()=> {
        setPayload({
            ...payload?.documents,
                newDocs,
                oldDocs
        })
    },[])

    const handleChange = (name, value) => {
        setPayload({
            ...payload,
            [name]: value,
        });

        console.log(name, value);
    };

    const handleChangeNewDocs =(name, value)=>{
        setNewDoc({
            ...newDocs,
            [name]: value
        })
    }

    const handleChangeOldDocs =(name, value) => {
        setOldDocs({
            ...oldDocs,
            [name]: value
        })
    }

    const handleAddForm = () => {
        let oldArr = [...newDocs?.documents];
        let newArr = [...oldArr];
        newArr.push({});

        handleChangeNewDocs("documents", newArr);
    };

    const handleChangeArray = (name, value, thisIndex) => {
        let oldArr = [...newDocs?.documents];
        let curRow = { ...oldArr[thisIndex] };
        curRow[name] = value;
        oldArr[thisIndex] = curRow;

        handleChangeNewDocs("documents", oldArr);
    };

    const handleDeleteArray = (delIndex) => {
        let oldArr = [...newDocs?.documents];
        handleChangeNewDocs(
                "documents",
                oldArr?.filter((itm, ind) => {
                return ind !== delIndex;
            })
        );
    };

    const handleChangeFileArray = (name, value, thisIndex) => {
        let oldArr = [...newDocs?.documents];
        let curRow = { ...oldArr[thisIndex] };
        curRow[name] = value;
        oldArr[thisIndex] = curRow;

        handleChangeNewDocs("documents", oldArr);
    };

    console.log("old Docs",oldDocs)

    const handleDelete = (index) =>{
        let oldArr = [...oldDocs];
        
        setOldDocs(oldArr?.filter((itm) => {return itm?.id !== index}))
    }

    console.log("payload",payload)
    return<Container>
        <Form>
            <FormName name="Add Tax File Details" />
            <FormGroup>
                <FormField>
                <Dropdown
                    label="Province of return as on 31st December?"
                    name="taxfile_province"
                    selected={payload?.taxfile_province}
                    options={{ list: provinces, name: "name", value: "code" }}
                    handleChange={handleChange}
                />
                </FormField>
            </FormGroup>
            <LabelYesNo
                label="Have you moved to canada in 2023?"
                name="moved_to_canada"
                value={payload?.moved_to_canada}
                handleChange={handleChange}
            />

            {payload?.moved_to_canada === "YES" && <FormGroup>
                <FormField>
                <InputDate
                    label="Date of Entry"
                    name="date_of_entry"
                    value={payload.date_of_entry}
                    error={errors?.date_of_entry}
                    handleChange={handleChange}
                />
                </FormField>
            </FormGroup>}

            <LabelYesNo
                label="Do you want to setup or change your direct deposit with CRA?"
                name="direct_deposit_cra"
                value={payload?.direct_deposit_cra}
                handleChange={handleChange}
            />

            {payload?.direct_deposit_cra === "YES" && <FormGroup>
                <FormField>
                <div className="array-div">
                    <FileUpload
                    label="."
                    name="document_direct_deposit_cra"
                    fileName={payload?.document_direct_deposit_cra?.name}
                    handleFileChange={handleChange}
                    />
                </div>
                </FormField>
            </FormGroup>}

        </Form>

        <FormSectionName name="Your Selected Documents" />

        {oldDocs?.map((itm,index) => {
            return<FileComponent key={index}
                name={itm?.type?.name}
                handleDelete={()=>handleDelete(itm?.id)}
            />
        })}

        <FormSectionName name="Attach Documents" />
        {newDocs?.documents?.map((itm, index) => {
        return (
            <FormGroup key={index}>
            <FormField>
                <Dropdown
                label="Document Type"
                name="typeid"
                selected={itm?.typeid}
                options={{ list: docType, name: "name", value: "id" }}
                handleChange={(name, value) =>
                    handleChangeArray(name, value, index)
                }
                />
            </FormField>
            <FormField>
                <div className="array-div">
                <FileUpload
                    label="."
                    name="taxfile"
                    fileName={itm?.taxfile?.name}
                    handleFileChange={(name, value) =>
                    handleChangeFileArray(name, value, index)
                    }
                />

                {index>0 && <Button maxWidth={'100%'}
                    varient="icon"
                    title={<IconDelete />}
                    onClick={() => handleDeleteArray(index)}
                />}
                
                </div>
            </FormField>
            </FormGroup>
        );
        })}
        <div
        className=""
        style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
        }}
        >
        <button style={{ padding: "8px" }} onClick={handleAddForm}>
            + Add More Documents
        </button>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
        <Button
            name="addTaxFile"
            title="Update Tax File"
            onClick={handleSubmit}
        />
        </div>
        <br />
    </Container>
}

export default TaxFileUpdate;

const FileComponent = (props) => {

    return (
        <div className="file-component-section">
            <div>{props?.name}</div>
            <div className="file-component-btn-div">
                <Button maxWidth={'100%'}
                    varient="icon"
                    title={<IconDelete />}
                    onClick={props?.handleDelete}
                />
            </div>
        </div>
    );
  };