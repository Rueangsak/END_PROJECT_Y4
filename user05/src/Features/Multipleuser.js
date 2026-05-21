import { Button} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { db } from "../firebase/firebase";
import { addDoc, collection, doc } from 'firebase/firestore';
import '../CSS/style.css';


import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';


export default function Multipleuser(props) {
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
      setHelperText('You got it right!');
      setError(false);
    }
    else if (Checkans === false) {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    }
    else {
      setHelperText('Please select an option.');
    }
};




    const docRef = doc(db, "Form", docId);
    
    const handleAddAnswer = () => {
      addDoc(collection(docRef, "answers"), {
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
                  {props.data.ans.map((option, index) => (

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
          <Button  style={{marginTop:40}} variant="contained" onClick={() => [props.setIndexFilterShow(props.indexFilterShow+1),setCheck(true)]}>Send</Button>
        </div> 
      )
       
       
    
}

    


