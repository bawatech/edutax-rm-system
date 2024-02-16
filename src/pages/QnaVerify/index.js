import { useEffect, useState } from "react";
import { ErrorMessage, LabelYesNo } from "../../components/Form";
import './style.css';
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Layout } from "../layouts/Layout";
const QnaVerify = () =>{
    const [error, setError] = useState("");
    const [selected,setSelected] = useState([])

    console.log('SHOW SELECTED',selected)
    const navigate = useNavigate();

    // useEffect(() => {
        // setQuestions(QuestionList);
    //     setError(Object.values(data).includes("YES") && "Value has Yes")
    // },[data])
    
    const handleChange = (value, index,id) => {
        console.log(value, index,id)
        let currentArray = selected;
        if(value){
            currentArray.push(id)
            setSelected(currentArray)
        }else{
            const newSelected = currentArray.filter(itm=> itm != id)
            setSelected(newSelected)
        }
        // const currentQuestions = [...questions]
        // const currentItem =currentQuestions[index]
        // currentItem.value = value;
        // currentQuestions[index] = currentItem;
        // setQuestions(currentItem)
    }

    const handleSubmit = () =>{
        // if(error === "" || error === false){
            navigate("/sign-up")
        // }else if(Object.values(data).includes("YES")){
        //     setError("Value Has Yes")
        // }
    }

    return <Layout>
        <div className="home-container">
        <div className="home-inner-container">
            {questionList?.map((itm, index) => { return <LabelYesNo 
                    key={index}
                    id={itm?.id}
                    name={itm?.name}
                    label={`${index+1}. ${itm?.label}`}
                    value={(selected.includes(itm?.id))?true:false}
                    handleChange={(name,value)=>handleChange(value,index,itm?.id)}
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
        label: 'Do you have any Business/Self-employed income',
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
        label: 'Do you have any Rental Income',
        value: false
    },
]