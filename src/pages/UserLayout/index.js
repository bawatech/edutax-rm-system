import './style.css'


const UserLayout = (props) => {

    return(<div className="userlayout-section">
        <div className="userlayout-inner-section">
            <h1>header</h1>
            <br/>
            {props.children}
            <br/>
            <h1>Footer</h1>
        </div>
    </div>)
}

export default UserLayout;