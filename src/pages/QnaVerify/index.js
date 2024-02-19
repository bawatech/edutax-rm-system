import {  useState } from "react";
import { ErrorMessage, LabelYesNo } from "../../components/Form";
import './style.css';
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Layout } from "../layouts/Layout";


const QnaVerify = () =>{
    const [error, setError] = useState("");
    const [selected,setSelected] = useState([])
    const navigate = useNavigate();
   console.log('ssssssssssss',selected)
    const handleChange = (value,id) => {
        setError("")
        let currentArray = [...selected];
        
        if(value=='YES'){
            currentArray.push(id)
            setSelected(currentArray)
        }else{
            const newSelected = currentArray.filter(itm=> itm != id)
            setSelected(newSelected)
        }
    }

    const handleSubmit = () =>{
        if(selected.length==0){
            setError("")
            navigate("/sign-up")
        }else{
            setError("Your return is not eligible for online filing. Please contact us on 905-790-6200")

        }
    }

    return <Layout>
        <div className="home-container">
        <div className="home-inner-container">
            {questionList?.map((itm, index) => { return <LabelYesNo 
                    key={index}
                    id={itm?.id}
                    name={itm?.name}
                    label={`${index+1}. ${itm?.label}`}
                    value={(selected.includes(itm?.id))?'YES':'NO'}
                    handleChange={(name,value)=>handleChange(value,itm?.id)}
                />
            })}
        </div>
        
        {error && <ErrorMessage error={error} /> }

        <Button 
            title="Submit"
            onClick={handleSubmit}
        />
    </div>
    </Layout>
    

}


export default QnaVerify;

const questionList = [
    {
        id: 'q1',
        name: 'question1',
        label: 'Do you have any Business/Self-employed income?',
        value: false
    },
    {
        id: 'q2',
        name: 'question2',
        label: 'Do you have any income from UBER, LIFT, SKIP etc?',
        value: false
    },
    {
        id: 'q3',
        name: 'question3',
        label: 'Do you have any Rental Income?',
        value: false
    },
]