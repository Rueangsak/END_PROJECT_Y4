import * as React from 'react';
import "firebase/firestore";
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import '../CSS/style.css';
import Chip from '@mui/material/Chip';
import { db } from "../firebase/firebase";
import { useParams } from 'react-router-dom';
import {Button,TextField} from '@mui/material';
import { useState,useEffect } from 'react';


export default function Openenduser(props) {

    const [answer,setAnswer] = useState('')
    const [name,setName] = useState([])
    const [loading,setLoading] = useState(true)
    const {docId,index} = useParams()
    const [check,setCheck] = useState(true)
    let docRef = db.collection("Form").doc(props.docId); 

    const handleAddAnswer = () => {
        docRef.collection('answers').add({
            answer: answer, 
            user : props.user,
            index : props.indexFilterShow
        })
        .then(() => {
            alert("Answer successfully added!");
            setCheck (false)
            console.log("Answer successfully added!");
            setAnswer('');
        })
        .catch((error) => {
            console.error("Error adding answer: ", error);
        });
    };
    useEffect (()=>{
        console.log("answerUser",props.answerUser);
    },[])


 if (check){

    return (
        <div class="head" style={{padding:40}}>
            <FormLabel style={{color:"black",fontFamily:"sans-serif",fontSize:34}} component="legend">{props.data.question}</FormLabel> 
            <br/>
            <div>
                <Box></Box>
                <div>
                    <TextField id="filled-basic" label="Answer please" variant="filled" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                    <div>
                    <Button  style={{marginTop:20}} variant="contained" onClick={handleAddAnswer}>Send</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

return(
    <div class="row">
            {props.answerUser.filter((data)=>data.index == props.indexFilterShow).map((data) => {   
                return (
                    <div style={{padding:8}}>
                    <Chip label={data.user+" "+" "+" "+"Answer :"+" "+data.answer}  style={{fontSize:18,padding:10}}/>
                    </div>
                )
            })} 
       
        <Button  style={{marginTop:30}} variant="contained" onClick={() => [props.setIndexFilterShow(props.indexFilterShow+1),setCheck(true)]}>Send</Button>
    </div>
)

}


