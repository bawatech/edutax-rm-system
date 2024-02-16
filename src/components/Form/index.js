import { useRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "../Icon";
import "./style.css";
import { AiFillAudio } from "react-icons/ai";
import { MdMessage, MdOutlineDataExploration } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { Button } from "../Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
// ========================================= Radio/LabelYesNo Component============================================

export const LabelYesNo = (props) => {
  return (
    <div className={`label-yn ${props?.inline ? "inline" : ""}`}>
      <label className="label-yn-label flex gap-2">{props.label}</label>

      {props.box && <span className="label-yn-box">{props.box}</span>}

      <div className="label-yn-btn">
        <div
          className={`ynbtn first ${props.value === "YES" ? "active" : ""}`}
          onClick={() =>
            props.handleChange(props.name, props.value === "YES" ? "" : "YES")
          }
        >
          Yes
        </div>
        <div
          className={`ynbtn ${props.value === "NO" ? "active" : ""}`}
          onClick={() =>
            props.handleChange(props.name, props.value === "NO" ? "" : "NO")
          }
        >
          No
        </div>
      </div>
    </div>
  );
};
// ========================================= Radio / LabelYesNo Component============================================

// ===================================Error Message======================================================

export const ErrorMessage = (props) => {
  return (
    <div className="error-container">
      <span>{props?.error}</span>
    </div>
  );
};

// ===================================Error Message======================================================

// ===================================FormGroup======================================================

export const FormGroup = (props) => {
  return <div className="form-group">{props.children}</div>;
};


export const Form = (props) => {
  return <div className="form">{props?.children}</div>;
};


export const FormName = (props) => {
  return <div className="form-name">{props?.name}</div>;
};

export const FormSectionName = (props) => {
  return <div className="form-section-name">{props?.name}</div>;
};

// ===================================FormGroup======================================================
// ===================================FormField======================================================

export const FormField = (props) => {
  return <div className="form-field">{props.children}</div>;
};

// ===================================FormField======================================================
// ===================================Input======================================================

export const Input = (props) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="input-div">
      {props?.label && <label className="input-label">{props?.label}</label>}
      <div className="input-inner-div">
        <input
          className="input"
          name={props?.name}
          value={props?.value || ""}
          placeholder={props?.hint}
          type={props?.password ? (toggle ? "text" : "password") : props?.type}
          onChange={(e) => props?.handleChange(props.name, e.target.value)}
        />
        {props?.password && (
          <span className="icon icon-pass" onClick={handleToggle}>
            {toggle ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        )}
      </div>
      {props?.error && <p className="input-error-text">{props.error}</p>}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};
// ===================================Input======================================================

// ===================================chat Input======================================================

export const ChatInput = (props) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="input-div">
      {props?.label && <label className="input-label">{props?.label}</label>}
      <div className="chatinput-inner-div">
        <input
          className="chatinput"
          name={props?.name}
          value={props?.value || ""}
          placeholder={props?.hint}
          type={props?.password ? (toggle ? "text" : "password") : props?.type}
          onChange={(e) => props?.handleChange(e.target.value)}
        />
        {/* <Button
          title={<AiFillAudio />}
          varient="icon"
          onClick={props?.onClickAudio}
        />
        <Button
          title={<MdMessage />}
          varient="icon"
          onClick={props?.onClickMessage}
        /> */}
        <Button
          title={<IoSendSharp />}
          varient="icon"
          onClick={props?.onClickSend}
        />
        {props?.password && (
          <span className="icon icon-pass" onClick={handleToggle}>
            {toggle ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        )}
      </div>
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};
// ===================================chat Input======================================================

// ===================================Dropdown======================================================
export const Dropdown = (props) => {
  return (
    <div className="dropdown-section">
      {props?.label && <label className="input-label">{props?.label}</label>}
      <div className="dropdown-inner-div">
        <select
          className="dropdown"
          id={props.id}
          onChange={(e) =>
            props.handleChange(
              props.name,
              e?.target?.value,
              props?.options?.list.find(
                (itm) => itm[props?.options?.value] == e?.target?.value
              )
            )
          }
          value={props?.selected}
        >
          <option value="0">--Select--</option>

          {props?.options?.list?.map((itm, index) => {
            return (
              <option id={index} key={index} value={itm[props?.options?.value]}>
                {itm[props?.options?.name]}
              </option>
            );
          })}
        </select>
      </div>
      {props?.error && <p className="input-error-text">{props.error}</p>}
    </div>
  );
};
// ===================================Dropdown======================================================

export const FileUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const refImage = useRef();
  const handleFileChange = (event) => {
    props?.handleFileChange(props?.name, event.target.files[0])
    setSelectedFile(event.target.files[0]);
  };

  console.log(selectedFile)
  const handleUpload = () => {
    refImage.current.click();
  };

  return (
    <div className="file-main-section">
      {props?.label && <label className="input-label">{props?.label}</label>}
      <div className="file-section">
        <p className="file-name-display">{props?.fileName}</p>
        <input
          ref={refImage}
          className="file"
          type="file"
          name={props?.name}
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>{selectedFile?.name ? selectedFile?.name : 'Choose file'}</button>
      </div>
    </div>
  );
};

// =================================================================

export const ChatLayout = (props) => {
  return (
    <div className="details-chat-section">
      <div className="details-chat-inner-section">
        <div className="details-chat-msg-div">
          <Sender msg="snvlksdnvlksdnvlk" />
          <Reciever msg=";svbknkl;vns;kdnvk;sdnv;ksndvkinpirnbpirenpn" />
        </div>
        <div className="details-chat-input-div">{props?.children}</div>
      </div>
    </div>
  );
};

const Sender = (props) => {
  return (
    <div className="sender-div-section">
      <div className="sender-div">
        <p>{props?.msg}</p>
      </div>
    </div>
  );
};

const Reciever = (props) => {
  return (
    <div className="reciever-div-section">
      <div className="reciever-div">
        <p>{props?.msg}</p>
      </div>
    </div>
  );
};

export const InputDate = (props) => {
  let value = null;
  if (moment(props?.value, "yyyy-MM-DD", true).isValid()) {
    value = new Date(Date.parse(props?.value));
  }
  const handleChange = (newVal) => {
    if (moment(newVal).isValid()) {
      props?.handleChange(props?.name, moment(newVal).format("yyyy-MM-DD"));
    } else {
      props?.handleChange(props?.name, null);
    }
  };
  return (
    <>
      <DatePicker
        showIcon
        isClearable
        dateFormat="dd-MMM-YYYY"
        selected={value}
        onChange={handleChange}
      />
      {props?.error && <p className="input-error-text">{props.error}</p>}
    </>
  );
};
