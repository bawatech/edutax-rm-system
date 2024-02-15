import "./style.css";
import logo from "./../../../assets/images/logo.png"
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



const HeaderRight=()=>{
  return <div className="layout-header-content">
    <img src={logo} alt="logo" resizeMode="contain"/>
  </div>
}

