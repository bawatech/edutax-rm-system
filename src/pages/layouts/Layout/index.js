import "./style.css";
import logo from "./../../../assets/images/logo.png"
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Popup } from "../../../components/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/userSlice";
import { toastError } from "../../../BTUI/BtToast";
import { IoHomeIcon, IoIosNotificationsIcon, IoMdSettingsIcon, IoPersonIcon, RiLogoutCircleLineIcon } from "../../../components/Icon";


export const Layout = (props) => {

  const navigate = useNavigate();
  const {user} =useSelector(store=>store?.user)
  console.log('USER',user)
  useEffect(()=>{
    if(user?.token && user?.verify_status=='VERIFIED'){
      navigate('/user')
    }
  },[user?.user?.token])

  return (
    <div style={{position: 'relative'}}>
    <HeaderBfLogin>
      <HeaderLeft/>
      {/* <HeaderRightBfLogin /> */}
    </HeaderBfLogin>
    <div className="layout-section">
      <div className="layout-inner-section" style={{width: props?.width}}>
        {props.children}
      </div>
    </div>
    </div>
  );
};

Layout.defaultProps = {
  width: '80%',
}


export const UserLayout = (props) => {

  const navigate = useNavigate();
  const [toggle,setToggle] = useState(false)
  const user =useSelector(store=>store?.user)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!user?.user?.token){
      navigate('/login')
    }
  },[user?.user?.token])


  const handleLogout = (e)=>{
    dispatch(logout())
    .then(()=>{
      navigate('/login')
    })
    .catch(()=>{
      toastError('Something went wrong')
    })
    e.preventDefault();

    window.localStorage.clear();
    
    
  }

  const handleToggle =(e)=>{
    e.preventDefault();

    setToggle((prev)=>!prev)
  }

  return (
    <div style={{position: 'relative'}}>
    <Header>
      <HeaderLeft/>
      <HeaderRight 
        {...props}
        handleLogout={handleToggle}
      />
    </Header>
    <div className="layout-section">
      <div className="layout-inner-section">
        <Outlet/>
      </div>
    </div>



    
    <Popup
      trigger={toggle}
      setTrigger={handleToggle}
    >
      <p>Are you sure you want to logout?</p>

      <br/>
      <div className="" style={{
        display: 'flex',
        gap: '1em',
        width: '100%',
        justifyContent: 'center',
      }}>
        <Button title="Logout" varient="small" onClick={handleLogout}/>
        <Button title="Cancel" varient="small danger" onClick={handleToggle}/>
      </div>
      
    </Popup>
    </div>
  );
};


const Header =({children})=>{
  return <div className="layout-header">
  {children}
</div>
}

const HeaderBfLogin =({children})=>{
  return <div className="layout-header-bf-login">
  {children}
</div>
}

const HeaderLeft=()=>{
  return <div className="layout-header-logo">
    <img src={logo} alt="logo"/>
  </div>
}


const HeaderRightBfLogin=(props)=>{
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log(scrollPosition)

  return <div className={`layout-header-content-bf-login ${scrollPosition>10 ? '.active.active' : ''}`}>
    <div className="layout-right-header-bf-login ">
      <ul>
      <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact-us">Contact Us</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </div>
  </div>
}


const HeaderRight=(props)=>{

  return <div className="layout-header-content">
    <div className="layout-right-header">
      <ul>
      <li><NavLink to="/user"><IoHomeIcon /></NavLink></li>
        <li><NavLink to="/user/settings"><IoMdSettingsIcon /></NavLink></li>
        <li><NavLink to=""><IoIosNotificationsIcon /></NavLink></li>
        {/* <li><NavLink to=""><IoPerson /></NavLink></li> */}
        <li><NavLink to="" onClick={props?.handleLogout}><RiLogoutCircleLineIcon/></NavLink></li>
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
