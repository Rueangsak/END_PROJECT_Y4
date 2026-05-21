import Chip from '@mui/material/Chip';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { db } from "../firebase/firebase";
import { collection, doc, getDocs } from 'firebase/firestore';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


import { Link } from "react-router-dom"
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../CSS/style.css';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function RankingShow(props) {
    const {docId,index} = useParams()
    const [data,setData] = useState(null)
    const [answer,setAnswer] = useState('')
    const [loading,setLoading] = useState(true)
    const [check,setCheck] = useState(true)
    const [user,setUser] = useState('')
    const [name,setName] = useState([])
    
    
    
    const docRef = doc(db, "Form", docId);
    const [userData, setUserData] = useState({
        labels: name.map((data) => data.answer),
        datasets: [
          {
            label: "Ranking",
            data: name.map((data) => data.count),
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


    useEffect (()=>{
        getDocs(collection(docRef, "answers"))
        .then((querySnapshot) => {
            let x = []
            querySnapshot.forEach((doc) => {
                if (doc.data().index==index){
                   
                    let y =  x.findIndex((data) => data.answer==doc.data().answer)
                    if(y==-1){
                        x.push ({
                            user:doc.data ().user,
                            answer:doc.data ().answer,
                            count : 1
                        })
                    }
                    else {
                        x[y].count+=1
                    }
                    // x.push ({
                    //     user:doc.data ().user,
                    //     answer:doc.data ().answer,
                    //     count : 0
                    // })
                }
                
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
            setName (x)
            setLoading(false)
            setUserData ({
                labels: x.map((data) => data.answer),
                datasets: [
                  {
                    label: "Ranking",
                    fontFamily:"Serif",
                    data: x.map((data) => data.count),
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
              })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
   
    },[])
    
       
      

    return (
      <div class="row">
        
      {props.answerUser.filter((data)=>data.index == props.indexFilterShow).map((data) => { 
        console.log("data",data);  
          return (
              <div style={{padding:8}}>
              <BarChart label={data.user+" "+" "+" "+"Answer :"+" "+data.answer}  style={{fontSize:18,padding:10}}/>
              </div>
          )
      })} 
</div>
      );
  

}
