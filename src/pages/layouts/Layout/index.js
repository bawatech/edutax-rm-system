import "./style.css";
import logo from "./../../../assets/images/logo.png"
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Center, Popup } from "../../../components/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/userSlice";
import { toastError } from "../../../BTUI/BtToast";
import { Email, Facebook, Hamberger, Insta, IoHomeIcon, IoMdSettingsIcon, Location, Phone, RiLogoutCircleLineIcon, Twitter } from "../../../components/Icon";
import { IconCross } from "../../../BTUI/Icons";


export const Layout = (props) => {

  const navigate = useNavigate();
  const {user} =useSelector(store=>store?.user)
  console.log('USER',user)
  useEffect(()=>{
    if(user?.token && user?.verify_status==='VERIFIED'){
      navigate('/user')
    }
  },[user?.user?.token])

  return (
    <div className="" style={{position: 'relative'}}>
    <HeaderBfLogin>
      <HeaderLeft/>
      <HeaderRightBfLogin />
    </HeaderBfLogin>
    <div className="layout-section">
      <div className="layout-inner-section" style={{width: props?.width}}>
        {props.children}
      </div>
    </div>
    <Footer>
            <FooterColumn 
                title="Company"
                
                points={[
                  {title: 'About Us', href: ''},
                  {title: 'Services', href: ''},
                ]}
            />

            <FooterColumn 
                title="Support"

                points={[
                  {title: 'Help Us', href: ''},
                  {title: 'Tweet Us', href: ''},
                ]}
            />

            <FooterColumn 
                title="Links"

                points={[
                  {title: 'Contact Us', href: '/contact'},
                  {title: 'Login', href: '/login'},
                  {title: 'Sign Up', href: '/qna-verify'},
                ]}
            />

            <FooterColumn 
                title="Contact Us"

                points={[
                  {icon: <Location/>, title: `Unit 206- 9886 Torbram Rd \n
                  Bramtpon - ON \n
                  L6S 3 L9 `, href: ''},
                  {icon: <Phone />, title: '905-790-6200', href: ''},
                  {icon: <Email/>, title: 'contact@edutax.ca', href: ''},
                ]}
                point2=""
                point3=""
            />
        </Footer>
    <LowerFooter>
      <Center>
        <p>&copy; 2024 Edutax. All rights reserved.</p>
      </Center>
    </LowerFooter>
    </div>
  );
};

Layout.defaultProps = {
  width: '80%',
}


export const UserLayout = (props) => {

  const navigate = useNavigate();
  const [toggle,setToggle] = useState(false)
  const user = useSelector(store=>store?.user)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!user?.user?.token){
      // navigate('/login')
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
    <LowerFooter>
      <Center>
        <p>&copy; 2024 Edutax. All rights reserved.</p>
      </Center>
    </LowerFooter>


    
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
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className={`layout-header-bf-login ${scrollPosition >= 10 ? 'active' : ''}`}>
  {children}
</div>
}

const HeaderLeft=()=>{
  return <div className="layout-header-logo">
    <img src={logo} alt="logo"/>
  </div>
}


const HeaderRightBfLogin=(props)=>{
  const [toggle, setToggle] = useState(false)

  return <div className={`layout-header-content-bf-login `}>
    <div className="layout-right-header-bf-login ">
      <ul className="lg-menu">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/contact">Contact Us</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
      <ul className="small-menu" style={{display: toggle ? "flex": "none"}}>
        <li style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '0em'}} onClick={()=>setToggle((prev) => !prev)}><IconCross /></li>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/contact">Contact Us</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>

      <div className="hamburger-div">
        <span onClick={()=>setToggle((prev) => !prev)} style={{fontSize: '1.5em', color: 'white', cursor: 'pointer'}}><Hamberger /></span>
      </div>
    </div>
  </div>
}


const HeaderRight=(props)=>{
  const [toggle, setToggle] = useState(false)

  return <div className="layout-header-content">
    <div className="layout-right-header">
      <ul className="lg-menu">
        <li><NavLink to="/user"><IoHomeIcon /></NavLink></li>
        <li><NavLink to="/user/settings"><IoMdSettingsIcon /></NavLink></li>
        <li><NavLink to="" onClick={props?.handleLogout}><RiLogoutCircleLineIcon/></NavLink></li>
      </ul>
      <ul className="small-menu" style={{display: toggle ? "flex": "none"}}>
        <li style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '-1em'}} onClick={()=>setToggle((prev) => !prev)}><IconCross /></li>
        <li><NavLink to="/user">Home</NavLink></li>
        <li><NavLink to="/user/settings">Settings</NavLink></li>
        <li><NavLink to="" onClick={props?.handleLogout}>Logout</NavLink></li>
      </ul>
      <div className="hamburger-div">
        <span onClick={()=>setToggle((prev) => !prev)} style={{fontSize: '1.5em', color: 'white', cursor: 'pointer'}}><Hamberger/></span>
      </div>
    </div>
  </div>
}

export const Footer = ({children}) => {

  return<div className="footer-section">
      <div className="footer-inner-section">
          <div className="footer-column logo-column">
              <h1>Edutax</h1>

              <p>We work hard to make your Tax filing process as easy and hassle-free as possible</p>
              
              <ul>
                  <li><NavLink to="https://www.instagram.com/edutax_"><Insta /></NavLink></li>
                  <li><NavLink to="https://www.facebook.com/profile.php?id=100047636203169&sfnsn=wiwspwa&mibextid=RUbZ1f"><Facebook /></NavLink></li>
                  <li><NavLink to=""><Twitter /></NavLink></li>
              </ul>
          </div>
          {children}
      </div>
  </div>
}

export const FooterColumn = (props) => {

  return<div className="footer-column">
      <h3>{props?.title}</h3>
      
      <ul>
        {props?.points?.map((point,index) => {
          return <li key={index}><NavLink to={point?.href}>{point?.icon && point?.icon}{point?.title}</NavLink></li>
        })}
      </ul>
  </div>
}

const LowerFooter = ({children}) =>{
  return <div className="layout-footer">
    {children}
  </div>
}

// const FooterContent = () => {
//   return <div className="footer-content">

//   </div>
// }
