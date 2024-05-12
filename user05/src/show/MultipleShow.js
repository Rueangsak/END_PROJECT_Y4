import { Button} from '@mui/material';
import "firebase/firestore";
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { db } from "../firebase/firebase";
import '../CSS/style.css';

import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';


export default function MultipleShow(props) {
    const {docId,index} = useParams()
    const [data,setData] = useState(null)
    const [ans,setAns] = useState([]);
    const [check,setCheck] = useState(true)
    const [user,setUser] = useState('')
    // const [ans,setAns] = useState(null)
    const [options, setOptions] = useState([]);
    const [loading,setLoading] = useState(true)
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);
    const [Checkans, setCheckans] = useState(null);
  

  const [Checkbtn, setCheckbtn] = useState(true);
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  


  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setCheckbtn(false)
    if( Checkans === true){
      setHelperText('คำตอบของคุณคือคำตอบที่ถูกกกก!');
      setError(false);
    }
    else if (Checkans === false) {
      setHelperText('คำตอบของคุณคือคำตอบที่ผิดดดด!');
      setError(true);
    }
    else {
      setHelperText('โปรดเลือกคำตอบ');
    }
};




    let docRef = db.collection("Form").doc(docId);
    
    const handleAddAnswer = () => {
      docRef.collection('answers').add({
          answer: answer, 
          user : props.user,
          index : props.indexFilterShow,
          status:Checkans,
      })  
      .then(() => {
          alert("Answer successfully added!");
          console.log("Answer successfully added!");
          setAnswer(''); // Clear the input field
          setCheck (false)
      })
      .catch((error) => {
          console.error("Error adding answer: ", error);
      });
  };





  console.log("props",Checkans,value);
  console.log("indexFilterShow",props.indexFilterShow);
 
        return (
          
          <div className="row"> 
           <form onSubmit={handleSubmit}> 
              <FormControl sx={{ m: 3 }} error={error} variant="standard">
                <FormLabel id="demo-error-radios">{props.data.question}</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-error-radios"
                  name="quiz"
                  value={value}
                  onChange={handleRadioChange}
                >
                  {props.answerUser.filter((data)=>data.index == props.indexFilterShow).map((option, index) => (

                  <FormControlLabel 
                  value={option.text}
                  id={`data${index}`} 
                  control={<Radio checked={answer === option.text}/>} 
                  onClick={()=> {
                    if(Checkbtn === true){
                      setAnswer(option.text)
                      setCheckans(option.status)
                    }
                    }} 
                  label={option.text} 
                  />
                  ))}
                 
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                  Check Answer
                </Button>
                

              </FormControl>
              </form>
        </div> 
      )
       
       
    
}





    


