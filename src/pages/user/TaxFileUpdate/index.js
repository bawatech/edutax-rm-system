
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
    const [oldDocs, setOldDocs] = useState([])
    const [newDocs, setNewDoc] = useState([{}])
    const [payload, setPayload] = useState({});
    const [errors, setErrors] = useState({});
    const [directDepositCra, setDirectDepositCra] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([])
    const [docType, setDocType] = useState([])
    const [loadingButton, setLoadingButton] = useState(false);
    

    
    useEffect(()=>{
        authService.getProvinces()
            .then((res)=>{
                setProvinces(res?.data?.response?.provincesList)
                console.log(res)
            })
            .catch((err)=>{
                
                console.log(err)
            });

        authService.getDocumentTypes()
            .then((res)=>{
                setDocType(res?.data?.response?.documentTypesList)
                console.log(res)
            })
            .catch((err)=>{
                
                console.log(err)
            });

        authService.getTaxfileDetails(param?.id)
            .then((res) => {
                console.log("Taxfile List",res)
                setPayload(res?.data?.response?.taxfile)
                setOldDocs(res?.data?.response?.taxfile?.documents.filter(doc=>doc?.user_type==="CLIENT"))
            })
            .catch((err)=>{
                console.log("Taxfile List",err)
            });
        
    },[])

    useEffect(()=>{
        if(payload?.direct_deposit_cra === "NO"){
            setDirectDepositCra(false)
        }
    },[payload?.direct_deposit_cra])

    const handleSubmit = () => {
        setLoadingButton(true)
        const documents = newDocs

        oldDocs.forEach(doc=>{
            documents.push({id: doc?.id})
        })
        const newPayload = {
            ...payload,
            documents
        }
        dispatch(updateTaxfile(newPayload))
            .then((res) => {
                toastSuccess(res?.data?.message);
                setLoadingButton(false)
                navigate(`/user/taxfile/${param?.id}`);
            })
            .catch((err) => {
                if (err?.data?.field_errors) {
                    setErrors(err?.data?.field_errors);
                } 
                toastError(err?.data?.message)
                setLoadingButton(false)
            });
    };

    const handleChange = (name, value) => {
        setPayload({
            ...payload,
            [name]: value,
        });

        console.log(name, value);
    };

    const handleAddForm = () => {
        let oldArr = [...newDocs];
        let newArr = [...oldArr];
        newArr.push({});

        setNewDoc(newArr);
    };

    const handleChangeArray = (name, value, thisIndex) => {
        let oldArr = [...newDocs];
        let curRow = { ...oldArr[thisIndex] };
        curRow[name] = value;
        oldArr[thisIndex] = curRow;

        setNewDoc(oldArr);
    };

    const handleDeleteArray = (delIndex) => {
        setNewDoc(newDocs?.filter((itm, ind) => {return ind !== delIndex;}));
    };

    const handleChangeFileArray = (name, value, thisIndex) => {
        let oldArr = [...newDocs];
        let curRow = { ...oldArr[thisIndex] };
        curRow[name] = value;
        oldArr[thisIndex] = curRow;

        setNewDoc(oldArr)
    };

    console.log("old Docs",oldDocs)
    console.log("new Docs",newDocs)

    const handleDelete = (index) =>{
        setOldDocs(oldDocs?.filter((itm) => {return itm?.id !== index}))
    }

    console.log("payload",payload)
    return<Container>
        <Form>
            <FormName name="Update Tax Return" />
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

            {payload?.direct_deposit_cra === "YES" ? directDepositCra ? <FileComponent 
                    name="Document (setup or change your direct deposit with CRA)"
                    handleDelete={()=>setDirectDepositCra(false)}
                /> : <FormGroup>
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
            </FormGroup>
            : null}

        </Form>

        <FormSectionName name="Your Selected Documents" />

        {oldDocs?.map((itm,index) => {
            return<FileComponent key={index}
                name={itm?.type?.name}
                handleDelete={()=>handleDelete(itm?.id)}
            />
        })}

        <FormSectionName name="Attach Documents" />
        {newDocs?.map((itm, index) => {
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

                {<Button maxWidth={'100%'}
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
            title="Update"
            loading={loadingButton}
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