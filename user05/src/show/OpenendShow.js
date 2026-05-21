import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import '../CSS/style.css';
import Chip from '@mui/material/Chip';
import { db } from "../firebase/firebase";
import { addDoc, collection, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import {Button,TextField} from '@mui/material';
import { useState,useEffect } from 'react';


export default function OpenendShow(props) {

    const [answer,setAnswer] = useState('')
    const [name,setName] = useState([])
    const [loading,setLoading] = useState(true)
    const {docId,index} = useParams()
    const [check,setCheck] = useState(true)
    const docRef = doc(db, "Form", props.docId); 

    const handleAddAnswer = () => {
        addDoc(collection(docRef, "answers"), {
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
        // console.log("answerUser",props.answerUser);
        // console.log("indexFilterShow",props.indexFilterShow);
        
    },[])


console.log("indexFilterShow",props.indexFilterShow);
return(
    <div class="row">
     
            {props.answerUser.filter((data)=>data.index == props.indexFilterShow).map((data) => {   
                console.log("data",data);
                
                return (
                    
                    <div style={{padding:8}}>
                    <Chip label={data.user+" "+" "+" "+"Answer :"+" "+data.answer}  style={{fontSize:18,padding:10}}/>
                    </div>
                )
            })} 
    </div>
)


}


