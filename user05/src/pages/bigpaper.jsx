import React from 'react'
import '../CSS/bigpaper.css'
import { useState,useEffect } from 'react';

import {Button,TextField} from '@mui/material';
import Chip from '@mui/material/Chip';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import OpenendShow from '../show/OpenendShow';
import RankingShow from '../show/RankingShowww';
import WordcloudShow from '../show/WordcloudShow';
import Checkbox from '@mui/material/Checkbox';




const Bigpaper = (props) => {
  const [filter,setFilter] = useState([])
  const [loading,setLoading] = useState(true)
  const [indexFilterShow,setIndexFilterShow] = useState(0)
  const {docId} = useParams()
const [user,setUser] = useState('')
const [answerUser,setanswerUser] = useState([])
const docRef = doc(db, "Form", docId);



  const [checked, setChecked] = React.useState(true);
  const handleChange = (event ) => {
    setChecked(event.target.checked);
  };


useEffect (()=>{
  onSnapshot(collection(docRef, "answers"), (querySnapshot) => {
      let x = []
      querySnapshot.forEach((doc) => {
          // if (doc.data().index == props.indexFilterShow){
              let y =  x.findIndex((data) => data.answer == doc.data().answer)
              if(y==-1){
                  x.push ({
                      user:doc.data ().user,
                      answer:doc.data ().answer,
                      count : 1,
                      index:doc.data().index,
                      status:doc.data().status,
                  })
              }
              else {
                  x[y].count+=1
              }
          // }
          // console.log(doc.id, " => ", doc.data());

      });
      console.log("X",x);
      setanswerUser ([...x])
      setLoading(false)
  }, (error) => {
      console.log("Error getting documents: ", error);
  });
},[])



  
  

  

  if(props.filter.length === 0){
    return(
      <h1>ยังไม่มีคำถาม</h1>
    )
  }

  else if (props.filter[props.indexFilterShow].featuresWork === "rank") {
    return (
        
        
        <div className="bigpaper-container" style={{width:1020,height:700}}>
          <h1>{"Ranking :" + (props.indexFilterShow+1) }</h1>
          <h1 style={{overflow:"unset"}}>{"question :" + props.filter[props.indexFilterShow].question}</h1> 
          <RankingShow data={props.filter[props.indexFilterShow]} indexFilterShow={props.indexFilterShow} setIndexFilterShow={setIndexFilterShow} docId={docId} user={user} answerUser={answerUser}/>
          </div>
       
          
        
      
    )
  }


  else if (props.filter[props.indexFilterShow].featuresWork  === "open") {
    return (
     
        <div className="bigpaper-container" style={{width:1020,height:700}}>
          <h1>{"Openend :" + (props.indexFilterShow+1) }</h1>
          <h1 style={{overflow:"unset"}}>{"question :" + props.filter[props.indexFilterShow].question}</h1> 
           
              <OpenendShow data={props.filter[props.indexFilterShow]} indexFilterShow={props.indexFilterShow} setIndexFilterShow={setIndexFilterShow} docId={docId} user={user} answerUser={answerUser}/>
           
          </div>
       
          
        
    
    )
  }  


  else if (props.filter[props.indexFilterShow].featuresWork  === "word") {
    return (
      <div className="bigpaper-container" style={{width:1020,height:700}}>
        <h1>{"WordCloud :" + (props.indexFilterShow+1) }</h1>
        <h1 style={{overflow:"unset"}}>{"question :" + props.filter[props.indexFilterShow].question}</h1>
       
            <div>
              <WordcloudShow data={props.filter[props.indexFilterShow]} indexFilterShow={props.indexFilterShow} setIndexFilterShow={setIndexFilterShow} docId={docId} user={user} answerUser={answerUser}/>
            </div>
          
              
          
      </div>
    )
  }  



  else if (props.filter[props.indexFilterShow].featuresWork  === "multiple") {
    return (
     
        <div className="bigpaper-container" style={{width:1020,height:700}}>
          <h1>{"Multiple :" + (props.indexFilterShow+1) }</h1>
          <h1 style={{overflow:"unset"}}>{"question :" + props.filter[props.indexFilterShow].question}</h1> 
          {props.filter[props.indexFilterShow].ans.map((data,index)=>{
            
           

            return(
              <div key={index}>
                <TextField label="Item" value={data.text} style={{padding:10}} />
                <Checkbox
                  checked={data.status  }
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            )
          }
          )}
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


// import Checkbox from '@mui/material/Checkbox';
// const [checked, setChecked] = React.useState(true);
// const handleChange = (event ) => {
//   setChecked(event.target.checked);
// };
// <Checkbox
//       checked={checked}
//       onChange={handleChange}
//       inputProps={{ 'aria-label': 'controlled' }}
//     />