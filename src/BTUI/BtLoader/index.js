import { useState, useEffect, useMemo } from "react";
import "./style.css";
import ReactLoading from 'react-loading';



export const BtLoader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleBtToast = (data) => {
    setIsVisible(data?.detail?.isVisible || false)
  };

  useEffect(() => {
    window.addEventListener("showHideBtLoader", (data) => {
      handleBtToast(data)
    });
    return () => {
      window.removeEventListener("showHideBtLoader", () => {
        setIsVisible(false);
      });
    };
  }, [handleBtToast]);



  if (!isVisible) {
    return false;
  }
  return (
    <>
      <div className='bt-loader-wrapper'>
        <div className="bt-loader-body">
          <Loader 
            type="cylon"
            color="#000"
          />
          {/* <h3 style={{textAlign:'center'}}>Loading ...</h3> */}
        </div>
      </div>
    </>
  );
};

export const showLoader = () => {
  const event = new CustomEvent("showHideBtLoader", {
    detail: {isVisible: true },
  });
  window.dispatchEvent(event);
};

export const hideLoader = () => {
  const event = new CustomEvent("showHideBtLoader", {
    detail: { isVisible: false },
  });
  window.dispatchEvent(event);
};


const Loader = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
);