import "./style.css";
import logo from "./../../../assets/images/logo.png"
const Layout = (props) => {
  return (
    <>
    <div className="layout-header">
        <div className="layout-header-logo">
        <img src={logo} alt="logo" resizeMode="contain"/>
        </div>
    </div>
    <div className="layout-section">
      <div className="layout-inner-section">
        
        <br />
        {props.children}
        <br />
      </div>
    </div>
    </>
  );
};

export default Layout;
