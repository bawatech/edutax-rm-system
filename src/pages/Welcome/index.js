import { useEffect, useState } from "react";
import { ErrorMessage, LabelYesNo } from "../../components/Form";
import './style.css';
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Welcome = () =>{
    const [questions, setQuestions] = useState([]);
    const [data, setData] = useState({});
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setQuestions(QuestionList);
    },[data])
    
    const handleChange = (name,value) => {
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = () =>{
        setError(Object.values(data).includes("YES") && "Value has Yes")
        navigate(error === false && "login")
    }
    console.log(data)


    return <div className="home-container">
        <div className="home-inner-container">
            {questions?.map((itm, index) => { return <LabelYesNo 
                    key={index}
                    id={index}
                    name={itm?.name}
                    label={`${index+1}. ${itm?.label}`}
                    value={data[itm?.name]}
                    handleChange={handleChange}
                />
            })}
        </div>
        
        {error && <ErrorMessage error={error} /> }

        <Button 
            title="Submit"
            onClick={handleSubmit}
        />

{console.log(error)}
    </div>
    

}


export default Welcome;

const QuestionList = [
    {
        id: 'q1',
        name: 'question1',
        label: 'Are you a student dfv dfśbśḍghśḍhgdsḥdf bg df b dsf b dfsb  dfsb d sfgb df sb dsf b dfs b dsf b dsf b df b dfb ds fgnbdsf b fsgnbdfsg nb rsn brs tb rstb',
        value: ''
    },
    {
        id: 'q2',
        name: 'question2',
        label: 'Are you a student df g dfh  dgsh dg sh g sdh df sh gsd fgh sde gh t h srt h srt h srt hsr th rst',
        value: ''
    },
    {
        id: 'q3',
        name: 'question3',
        label: 'Are you a student',
        value: ''
    },
    {
        id: 'q4',
        name: 'question4',
        label: 'Are you a student',
        value: ''
    },
    {
        id: 'q5',
        name: 'question5',
        label: 'Are you a student',
        value: ''
    },
    {
        id: 'q6',
        name: 'question6',
        label: 'Are you a student',
        value: ''
    },
    {
        id: 'q7',
        name: 'question7',
        label: 'Are you a student',
        value: ''
    },
    {
        id: 'q8',
        name: 'question8',
        label: 'Are you a student',
        value: ''
    },
]