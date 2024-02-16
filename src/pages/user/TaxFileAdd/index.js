import { useEffect, useState } from "react";
import {
  ChatInput,
  ChatLayout,
  Dropdown,
  FileUpload,
  Form,
  FormField,
  FormGroup,
  FormName,
  FormSectionName,
  Input,
  InputDate,
  LabelYesNo,
} from "../../../components/Form";
import { Button } from "../../../components/Button";
import "./style.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { addTaxfile } from "../../../store/userSlice";
import { UserLayout } from "../../layouts/Layout";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../BTUI/BtToast";
import { hideLoader, showLoader } from "../../../BTUI/BtLoader";
const TaxFileAdd = () => {
  const [payload, setPayload] = useState({
    documents: [
      {}
    ],
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    showLoader()
    dispatch(addTaxfile(payload))
      .then((res) => {
        console.log("Response", res?.data?.taxfile?.id);
        toastSuccess(res?.data?.message);
        hideLoader()
        navigate(`/user/tax-file-details/${res?.data?.taxfile?.id}`);
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

  const handleChange = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleAddForm = () => {
    let oldArr = [...payload?.documents];
    let newArr = [...oldArr];
    newArr.push({});

    handleChange("documents", newArr);
  };

  const handleChangeArray = (name, value, thisIndex) => {
    let oldArr = [...payload?.documents];
    let curRow = { ...oldArr[thisIndex] };
    curRow[name] = value;
    oldArr[thisIndex] = curRow;

    handleChange("documents", oldArr);
  };

  const handleDeleteArray = (delIndex) => {
    let oldArr = [...payload?.documents];
    handleChange(
      "documents",
      oldArr?.filter((itm, ind) => {
        return ind !== delIndex;
      })
    );
  };
  console.log("Payload", payload);

  const handleChangeFileArray = (name, value, thisIndex) => {
    let oldArr = [...payload?.documents];
    let curRow = { ...oldArr[thisIndex] };
    curRow[name] = value;
    oldArr[thisIndex] = curRow;

    handleChange("documents", oldArr);
  };

  return (
    <div className="">
      <UserLayout>
        <Form>
          <FormName name="Add Tax File Details" />
          <FormGroup>
            <FormField>
              <Dropdown
                label="PROVINCE OF RETURN AS ON 31ST DECEMBER?"
                name="taxfile_province"
                selected={payload?.taxfile_province}
                options={{ list: province, name: "name", value: "code" }}
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

          {payload?.moved_to_canada === "YES" && <FormField>
            <FormField>
              <InputDate
                label="Date of Entry"
                name="date_of_entry"
                value={payload.date_of_entry}
                error={errors?.date_of_entry}
                handleChange={handleChange}
              />
            </FormField>
          </FormField>}

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

        <FormSectionName name="Attach Documents" />
        {payload?.documents?.map((itm, index) => {
          return (
            <FormGroup key={index}>
              <FormField>
                <Dropdown
                  label="Document Type"
                  name="typeid"
                  selected={itm?.typeid}
                  options={{ list: documents, name: "name", value: "id" }}
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
                  <Button
                    varient="icon"
                    title={<RiDeleteBin6Line />}
                    onClick={() => handleDeleteArray(index)}
                  />
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
            title="Add TaxFile"
            onClick={handleSubmit}
          />
        </div>
        <br />
      </UserLayout>
    </div>
  );
};

export default TaxFileAdd;

const documents = [
  {
    id: "1",
    name: "Driving License",
  },
  {
    id: "2",
    name: "Aadhar Card",
  },
  {
    id: "3",
    name: "Voter Card",
  },
  {
    id: "4",
    name: "PAN Card",
  },
  {
    id: "5",
    name: "Passport",
  },
];

const maritalStatus = [
  {
    code: "MRD",
    name: "Married",
  },
  {
    code: "UNM",
    name: "Un Married",
  },
];

const province = [
  {
    code: "ON",
    name: "Ontario",
  },
  {
    code: "QC",
    name: "Quebec",
  },
];
