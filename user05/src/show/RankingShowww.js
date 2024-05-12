// import Box from '@mui/material/Box';
// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import Checkbox from '@mui/material/Checkbox';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import firebase from "firebase/app";

import { Bar } from "react-chartjs-2";
import "firebase/firestore";
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { db } from "../firebase/firebase";
import '../CSS/style.css';
import TextField from '@mui/material/TextField';


import { Button} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function RankingShowww(props) {
    const {docId,index} = useParams()
    const [data,setData] = useState(null)
    const [ans,setAns] = useState([]);
    const [check,setCheck] = useState(true)
    const [user,setUser] = useState('')
    const [loading,setLoading] = useState(true)
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);    
    const [name,setName] = useState([])

    let docRef = db.collection("Form").doc(docId);

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
      

  
    
    

    const [userData, setUserData] = useState({
        labels: props.answerUser.filter((data)=>data.index == props.indexFilterShow).map((data) => data.answer),
        datasets: [
          {
            label: "Ranking",
            data: props.answerUser.filter((data)=>data.index == props.indexFilterShow).map((data) => data.count),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
           
          },
        ],
      });
      function BarChart({ chartData }) {
        return <Bar data={chartData} />;
      }


    // useEffect (()=>{
    //         setUserData ({
    //             labels: props.answerUser.map((data) => data.answer),
    //             datasets: [
    //               {
    //                 label: "Ranking",
    //                 fontFamily:"Serif",
    //                 data: x.map((data) => data.count),
    //                 backgroundColor: [
    //                   "rgba(75,192,192,1)",
    //                   "#ecf0f1",
    //                   "#50AF95",
    //                   "#f3ba2f",
    //                   "#2a71d0",  
    //                 ],
    //                 borderColor: "black",
    //                 borderWidth: 2,
    //               },
    //             ],
    //           })
    //     })
    //     .catch((error) => {
    //         console.log("Error getting documents: ", error);
    //     });
        
    //   },[])
    




    console.log("props.indexFilterShow",props.indexFilterShow);
    return(
        
    <div className="row">
        
      <div style={{ width: 700 }}>
        
        <BarChart chartData={userData} />
      </div>
  </div>
)
       


}

    





