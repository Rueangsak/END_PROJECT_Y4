import * as React from 'react';
import "firebase/firestore";
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { db,auth } from "../firebase/firebase";
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../CSS/style.css';
import WordCloud from 'react-wordcloud';


// import { Link } from "react-router-dom"
// import firebase from "firebase";
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';


export default function WordcloudShow(props) {

    const [answer,setAnswer] = useState('')
    let docRef = db.collection("Form").doc(props.docId);
   
    const handleAddAnswer = () => {
        docRef.collection('answers').add({
            answer: answer, 
            user : props.user,
            index : props.indexFilterShow
        })
        .then(() => {
            alert("Answer successfully added!");
            console.log("Answer successfully added!");
            
            setCheck (false)
            setAnswer(''); // Clear the input field
        })
        .catch((error) => {
            console.error("Error adding answer: ", error);
        });
    };
  
    const [check,setCheck] = useState(true)
    
    const [name,setName] = useState([])
    

    console.log("indexFilterShow",props.indexFilterShow);

return(
        <div className="Wordcloud">
            <div class="row" >
                <WordCloud 
                    words={props.answerUser.filter((data)=>data.index == props.indexFilterShow).map((data) => ({ text: data.answer, value: data.count }))}
                />
            </div>
    </div>
    )
}



