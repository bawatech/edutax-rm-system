import "./style.css";
import logo from "./../../../assets/images/logo.png"
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Button } from "../../../components/Button";


export const Layout = (props) => {
  return (
    <>
    <Header>
      <HeaderLeft/>
    </Header>
    <div className="layout-section">
      <div className="layout-inner-section">
        {props.children}
      </div>
    </div>
    </>
  );
};


export const UserLayout = (props) => {
  return (
    <>
    <Header>
      <HeaderLeft/>
      <HeaderRight 
        {...props}
      />
    </Header>
    <div className="layout-section">
      <div className="layout-inner-section">
        {props.children}
      </div>
    </div>
    
    </>
  );
};


const Header =({children})=>{
  return <div className="layout-header">
  {children}
</div>
}

const HeaderLeft=()=>{
  return <div className="layout-header-logo">
    <img src={logo} alt="logo" resizeMode="contain"/>
  </div>
}



const HeaderRight=(props)=>{

  const navigate = useNavigate();

  const handleLogout = (e)=>{
    e.preventDefault();

    window.localStorage.clear();
    
    navigate('/login')
  }

  return <div className="layout-header-content">
    <div className="layout-right-header">
      <ul>
        <li><NavLink to=""><IoMdSettings /></NavLink></li>
        <li><NavLink to=""><IoIosNotifications /></NavLink></li>
        <li><NavLink to=""><IoPerson /></NavLink></li>
        <li><NavLink to="" onClick={handleLogout}><RiLogoutCircleLine/></NavLink></li>
        {/* <li><NavLink to="">{props?.name}</NavLink></li> */}
      </ul>
    </div>
  </div>
}

const Footer = ({children}) =>{
  return <div className="layout-footer">
    {children}
  </div>
}

const FooterContent = () => {
  return <div className="footer-content">

  </div>
}
