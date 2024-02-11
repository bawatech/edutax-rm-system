import './style.css'


export const Button = (props)=>{

    return <div className="btn-section">
        <button 
            className={`btn ${props?.varient}`}
            name={props?.name}
            type={props?.type}
            value={props?.value}
            style={props?.style}
            onClick={props?.onClick}
        >
            {props?.title}
        </button>
    </div>
}

Button.defaultProps = {
    type: 'button',
    title: 'title',
    varient: 'contained'
}