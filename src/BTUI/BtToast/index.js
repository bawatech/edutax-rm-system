import { useState, useEffect } from "react";
import "./style.css";
export const BtToast = () => {
  const [data, setData] = useState();
  const handleBtToast = (data) => {
    setData(data?.detail);
    setTimeout(() => {
      setData(null);
    }, 3000);
  };

  useEffect(() => {
    window.addEventListener("openBtToast", (data) => {
      handleBtToast(data);
    });
    return () => {
      window.removeEventListener("openBtToast", () => {
        setData(null);
      });
    };
  }, [handleBtToast]);

  if (!data) {
    return false;
  }
  return (
    <div className="bt-toast-div">
      <div
        className={`bt-toast type-${data?.type || "error"}`}
        onClick={() => setData(null)}
      >
        {/* {data?.title?<p style={{fontSize:'1.2em',fontWeight:'400',color:'white'}}>{data?.title}</p>:null} */}
        <p style={{ fontSize: "1em", color: "white" }}>{data?.message}</p>
      </div>
    </div>
  );
};

export const toastSuccess = (message) => {
  const event = new CustomEvent("openBtToast", {
    detail: {type: "success",message },
  });
  window.dispatchEvent(event);
};

export const toastError = (message) => {
  const event = new CustomEvent("openBtToast", {
    detail: { type: "error",message },
  });
  window.dispatchEvent(event);
};
