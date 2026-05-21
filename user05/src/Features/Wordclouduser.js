import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { db,auth } from "../firebase/firebase";
import { addDoc, collection, doc } from 'firebase/firestore';
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


export default function Wordclouduser(props) {
    // const {docId,index} = useParams()
    // const [data,setData] = useState(null)
    const [answer,setAnswer] = useState('')
    // const [loading,setLoading] = useState(true)
    // const [check,setCheck] = useState(true)
    // const [user,setUser] = useState('')
    const docRef = doc(db, "Form", props.docId);
    // useEffect (()=>{
    //     docRef.get().then((doc) => {
    //         if (doc.exists) {
    //             setData (doc.data().filter[index])
    //             setLoading (false)
    //             console.log("Document data:", doc.data().filter[index]);
    //         } else {
    //             console.log("No such document!");
    //         }
    //     }).catch((error) => {
    //         console.log("Error getting document:", error);
    //     });
    // },[])
    const handleAddAnswer = () => {
        addDoc(collection(docRef, "answers"), {
            answer: answer, 
            user : props.user,
            index : props.indexFilterShow
        })
        .then(() => {
            alert("Answer successfully added!");
            console.log("Answer successfully added!");
            setCheck (false)
            // props.setIndexFilterShow(props.indexFilterShow+1)
            setAnswer(''); // Clear the input field
        })
        .catch((error) => {
            console.error("Error adding answer: ", error);
        });
    };
  
    const [check,setCheck] = useState(true)
    
    const [name,setName] = useState([])
    // const [loading,setLoading] = useState(true)
    // const [userData, setUserData] = useState({
    //     labels: name.map((data) => data.answer),
    //   });
    // const {docId,index} = useParams() 


    if (check){

      
        return (
            <div class="head" style={{padding:40}}>
                <FormLabel style={{color:"black",fontFamily:"sans-serif",fontSize:34}} component="legend">{props.data.question}</FormLabel> 
                <br/>
                <div>
                    <Box></Box>
                    <div>
                        <TextField id="filled-basic" label="Answer please" variant="filled" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        <div class="row">
                        <Button  variant="contained" onClick={handleAddAnswer}>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
return(
        <div className="Wordcloud">
            <div class="row" >
            <WordCloud 
                words={props.answerUser.filter((data)=>data.index == props.indexFilterShow).map((data) => ({ text: data.answer, value: data.count }))}
            />
            <div class="head">
                <Button  style={{marginTop:40}} variant="contained" onClick={() => [props.setIndexFilterShow(props.indexFilterShow+1),setCheck(true)]}>Send</Button>
            </div>
            </div>
            
    </div>
    )
}



