import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import authService from "../../service/auth"
import { toastError } from "../../BTUI/BtToast"
import './style.css'
const PaymentResponse = () => {
    const [details,setDetails] = useState(null)
    const [status,setStatus] = useState('loading')
    const {uid} = useParams()

    useEffect(()=>{

        getDetails();

    },[uid])

    console.log('Details',details)

    const getDetails =()=>{
        authService.getPaymentOrderResponse(uid)
      .then((res) => {
        console.log('RESPONSE ',res?.data?.response)
        setStatus(null)
        setDetails(res?.data?.response?.order)

        //   if(res?.data?.response?.taxfiles){
        //     setPayload(res?.data?.response?.taxfiles)
        //   }
      })
      .catch((err) => {
        toastError('Something went wrong')
      })
    }
    return <>
    
        <div className="payment-resp-wrapper">
            <div className="payment-resp">
                {(()=>{
                    if(status == 'loading') {
                        return <div className="payment-resp-loading">Please wait. Loading... </div>
                    } else if (details?.payment_status == 'Paid') {
                        return <div className="payment-resp-content">
                                 <div className="resp-message" style={{color:'green'}}>Payement Completed Successfully</div>
                                 <div>Title : <b>{details?.title}</b> </div>
                                 <div>Amount : <b>{details?.amount}</b> </div>
                                  
                            </div>
                    } else if (details?.payment_status == 'Pending') {
                        return <div className="payment-resp-content">
                                 <div className="resp-message" style={{color:'blue'}}>Payement under processing</div>
                                 <div>Title : <b>{details?.title}</b> </div>
                                 <div>Amount : <b>{details?.amount}</b> </div>
                                  
                            </div>
                    } else {
                        return <div className="payment-resp-content">
                                 <div className="resp-message" style={{color:'red',fontSize:'.9em',textAlign:'center'}}>Something went wrong.<br/>Please contact your service provider</div>                                 
                            </div>
                    }
                })()}
            </div>
        </div>
    </>
}
export default PaymentResponse