import './style.css';
import { Container, FormField, FormGroup, Input } from "../../../components/Form";
import { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/userSlice';
import { Layout } from '../../layouts/Layout';
import { toastError, toastSuccess } from '../../../BTUI/BtToast';
import authService from '../../../service/auth';
const AcceptInvite = () => {
    const [invitationMsg,setInvitationMsg] = useState("Invitation Not Accepted")
    const [errors, setErrors] = useState({});
    const [loadingButton,setLoadingButton] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const param = useParams();

    useEffect(() => {
        authService
          .acceptSpouseInvitation(param?.token)
          .then((res) => {
           // console.log('Invitation message ', res?.data)
           setInvitationMsg(res?.data?.message)
          })
          .catch((err) => {
            console.log('Error in Invitation', err)
            setInvitationMsg(err?.data?.message)
            // toastError(err?.data?.message)
          });
      }, []);


    return <Layout>
            <Container maxWidth="30em">
                <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>Verification Status</h2>

                <br />
                <div style={{textAlign: 'center'}}>
                    <br />
                    <NavLink to="/login"><div style={{ textAlign: 'center', marginBottom: '2em', color:"#fff", backgroundColor:"#2d87ca",padding:'50px 50px',borderRadius:"20px" }}><h2>{invitationMsg}</h2></div></NavLink>
                    <br />
                    <br />
                    <NavLink className="gotoSignup" to="/home">Go to Dashboard</NavLink>
                </div>
                
            </Container>
    </Layout>
}

export default AcceptInvite;