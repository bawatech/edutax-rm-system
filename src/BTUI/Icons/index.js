import { IconContext } from "react-icons";
import { FaMessage } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoIosCall } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";



const Icon=(props)=>{
    return <IconContext.Provider value={{ color: "black", className: "global-class-name",...props }}>
    {
        props?.onClick 
        ? <div style={{cursor:"pointer"}} onClick={props?.onClick}>
        {props?.children}
      </div>
        :<div>
        {props?.children}
      </div>
    }
    
    
  </IconContext.Provider>
}


export const IconSendMessage=(props)=>{

    return <Icon {...props}>
        <IoSendSharp/>
    </Icon>
}

export const IconCross=(props)=>{

  return <Icon {...props}>
      <RxCross2/>
  </Icon>
}

export const IconSocialMessage=(props)=>{

  return <Icon {...props}>
      <BiSolidMessageRounded/>
  </Icon>
}

export const IconSocialCall=(props)=>{

  return <Icon {...props}>
      <IoIosCall />
  </Icon>
}

export const IconWhatsapp=(props)=>{

  return <Icon {...props}>
      <IoLogoWhatsapp/>
  </Icon>
}

export const IconMessage=(props)=>{

  return <Icon {...props}>
      <FaMessage/>
  </Icon>
}

export const IconProfile=(props)=>{

  return <Icon {...props}>
      <IoPersonSharp/>
  </Icon>
}

export const IconFile=(props)=>{

  return <Icon {...props}>
      <FaFileAlt/>
  </Icon>
}

export const IconSetting=(props)=>{

  return <Icon {...props}>
      <IoSettingsSharp/>
  </Icon>
}

export const IconAddPerson=(props)=>{

  return <Icon {...props}>
      <IoMdPersonAdd/>
  </Icon>
}