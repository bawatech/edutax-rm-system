import { IconContext } from "react-icons";
import { IoSendSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";


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