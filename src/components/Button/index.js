import './style.css'
import ReactLoading from 'react-loading';

export const Button = (props)=>{

    return <div className="btn-section">
        <button 
            className={`btn ${props?.varient}`}
            name={props?.name}
            type={props?.type}
            value={props?.value}
            style={{maxWidth: props?.maxWidth, background: props?.background}}
            onClick={props?.onClick}
            disabled= {props?.disabled || props?.loading}
        >
            {props?.loading ? <Loader type="bars" color="white"/> : props?.title}
        </button>
    </div>
}

Button.defaultProps = {
    type: 'button',
    title: 'title',
    varient: 'contained',
    loading:false,
    loadingText:'Loading',
    maxWidth: '20%',
}

const Loader = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'50px'} width={'100%'} />
);