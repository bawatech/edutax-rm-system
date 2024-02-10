import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '../Icon';
import './style.css';


// ========================================= Radio/LabelYesNo Component============================================

export const LabelYesNo = (props) => {

    return (
    <div className={`label-yn ${props?.inline?'inline':''}`}>
        <label className="label-yn-label flex gap-2">{props.label}</label>

        {props.box && <span className="label-yn-box">{props.box}</span>}

        <div className="label-yn-btn">
        <div className={`ynbtn first ${(props.value==='YES')?'active':''}`}  onClick={()=>props.handleChange(props.name ,props.value==='YES'?'':'YES')}>Yes</div>
        <div className={`ynbtn ${(props.value==='NO')?'active':''}`} onClick={()=>props.handleChange(props.name,props.value==='NO'?'':'NO')}>No</div>
        </div>

    </div>
    );
};
  // ========================================= Radio / LabelYesNo Component============================================

// ===================================Error Message======================================================

    export const ErrorMessage = (props) =>{

        return <div className="error-container">
            <span>{props?.error}</span>
        </div>
    }

// ===================================Error Message======================================================

// ===================================Input======================================================

    export const Input =(props) =>{
        const [toggle, setToggle] = useState(false);
        
        const handleToggle = () =>{
            setToggle((prev) => !prev)
        }


        return<div className="input-div">
            <input 
                className="input"
                name={props?.name}
                value={props?.value || ''}
                placeholder={props?.hint}
                type={props?.password ? toggle ? 'text': 'password' :props?.type }
                onChange={(e)=>props?.handleChange(props.name, e.target.value)}
            /> 
            {props?.password && <span className='icon icon-pass' onClick={handleToggle}>{ toggle ? <EyeOffIcon/> :<EyeIcon/>}</span>} 
        </div>
    }
    
    Input.defaultProps = {
        type: 'text',
    }
// ===================================Input======================================================

