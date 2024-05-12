import React from 'react'
import '../CSS/bigpaper.css'
import TextField from '@mui/material/TextField';
import QR from './QR'
import Chip from '@mui/material/Chip';
import serviceApi from '../firebase/serviceApi';
import { useState,useEffect} from 'react'
import { db } from "../firebase/firebase";
import { useParams } from 'react-router-dom'
import WordCloud from 'react-wordcloud';
import { Bar } from "react-chartjs-2";



const Bigpaper = (props) => {




  const {docId} = useParams()
  const [filter,setFilter] = useState([])
  let docRef = db.collection("Form").doc(docId);
  const [answerUser,setanswerUser] = useState([])

  
//   useEffect (()=>{
//     docRef.collection("answers")
//     .onSnapshot((querySnapshot) => {
//         let x = []
//         querySnapshot.forEach((doc) => {
//             // if (doc.data().index == props.indexFilterShow){
//                 let y =  x.findIndex((data) => data.answer == doc.data().answer)
//                 if(y==-1){
//                     x.push ({
//                         user:doc.data ().user,
//                         answer:doc.data ().answer,
//                         count : 1,
//                         index:doc.data().index,
//                         status:doc.data().status,
//                     })
//                 }
//                 else {
//                     x[y].count+=1
//                 }
//         });
//         setanswerUser ([...x])
//         console.log("workdata",x);
//     }, (error) => {
//         console.log("Error getting documents:", error);
//     });
// },[])









  if(props.filter.length === 0){

    return(
      <h1>ยังไม่มีคำถาม</h1>
    )
  }

  else if (props.filter[props.indexFilterShow].featuresWork === "rank") {
    return (
      <div className="bigpaper-container1">
      <div className="bigpaper-container" style={{width:1020,height:700}}>
        <h1>{"Ranking :" + (props.indexFilterShow+1) }</h1>
        <h1 style={{overflow:"unset"}}>{"question :" + props.filter[props.indexFilterShow].question}</h1> 
        

      
        



        {props.filter[props.indexFilterShow].ans.map((data,index)=>{
          return(
            <div key={index}>
              <TextField label="Item" value={data.text} style={{padding:10}} />
            </div>
          )
        }
        )} 
    </div>
    </div>
    )
  }


  else if (props.filter[props.indexFilterShow].featuresWork  === "open") {
    return (
      <div className="bigpaper-container1">
        <div className="bigpaper-container" style={{width:1020,height:700}}>
          <h1>{"Openend :" + (props.indexFilterShow+1) }</h1>
          <h1 style={{overflow:"unset"}}>{"question :" + props.filter[props.indexFilterShow].question}</h1> 
         

            {/* <div>
              {answerUser.filter((data)=>data.index == props.indexFilterShow).map((data) => {   
                  return (
                      <div style={{padding:8}}>
                      <Chip label={data.user+" "+" "+" "+"Answer :"+" "+data.answer}  style={{fontSize:18,padding:10}}/>
                      </div>
                  )
              })} 
            </div> */}
  
          
         {props.filter[props.indexFilterShow].ans.map((index)=>{
            return(
            <div key={index}></div>
              
          )
         }
        )}
        </div>
      </div>
    )
  }  


  else if (props.filter[props.indexFilterShow].featuresWork  === "word") {
    return (
      <div className="bigpaper-container1">
        <div className="bigpaper-container" style={{width:1020,height:700}}>
        <h1>{"WordCloud :" + (props.indexFilterShow+1) }</h1>
        <h1 style={{overflow:"unset"}}>{"question :" + props.filter[props.indexFilterShow].question}</h1> 

            {/* <div>
            <WordCloud style={{width:500,height:500}}
                words={answerUser.filter((data)=>data.index == props.indexFilterShow).map((data) => ({ text: data.answer, value: data.count }))}
            />
            </div> */}

        {props.filter[props.indexFilterShow].ans.map((index)=>{
          return(
            <div key={index}></div>
              
          )
        }
        )}
       
        </div>
      </div>
    )
  }  



  else if (props.filter[props.indexFilterShow].featuresWork  === "multiple") {
    return (
      <div className="bigpaper-container1">
        <div className="bigpaper-container" style={{width:1020,height:700}}>

          {/* <Multiple title={props.imgShow.tit} ans={props.imgShow.items}/> */}

          <h1>{"Multiple :" + (props.indexFilterShow+1) }</h1>
          <h1 style={{overflow:"unset"}}>{"question :" + props.filter[props.indexFilterShow].question}</h1>


          {props.filter[props.indexFilterShow].ans.map((data,index)=>{
            return(
              <div key={index}>
                <TextField label="Item" value={data.text} style={{padding:10}} />

                {/* <input type="radio"  name="big-paper-status" checked={data.status}  /> */}

              </div>
            )
          }
          )}
        </div>
      </div>
    )
  }

  else if (props.filter[props.indexFilterShow].featuresWork  === "QRcode") {
    return (
      <div className="bigpaper-container1">
        <div className="bigpaper-container" style={{width:1020,height:700}}>
        <h1>{"QRcode :" + (props.indexFilterShow+1) }</h1>
        <QR/> 
        </div>
      </div>
    )
  }


  
  return (
    
      <div className="bigpaper-container1">
        {/* <div class="bigpaper-container22">
          <img id="expandedImg" style={{width:1000,height:700}} src={props.imgShow.url} />
          <div id="imgtext"></div>
        </div> */}
      </div>
    
  )
}

export default Bigpaper
