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
        label: 'Are you a student dfv dfśbśḍghśḍhgdsḥdf bg df b dsf b dfsb  dfsb d sfgb df sb dsf b dfs b dsf b dsf b df b dfb ds fgnbdsf b fsgnbdfsg nb rsn brs tb rstb',
        value: false
    },
    {
        id: 'q2',
        name: 'question2',
        label: 'Are you a student df g dfh  dgsh dg sh g sdh df sh gsd fgh sde gh t h srt h srt h srt hsr th rst',
        value: false
    },
    {
        id: 'q3',
        name: 'question3',
        label: 'Are you a student',
        value: false
    },
    {
        id: 'q4',
        name: 'question4',
        label: 'Are you a student',
        value: false
    },
    {
        id: 'q5',
        name: 'question5',
        label: 'Are you a student',
        value: false
    },
    {
        id: 'q6',
        name: 'question6',
        label: 'Are you a student',
        value: false
    },
    {
        id: 'q7',
        name: 'question7',
        label: 'Are you a student',
        value: false
    },
    {
        id: 'q8',
        name: 'question8',
        label: 'Are you a student',
        value: false
    },
]