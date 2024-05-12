import React from 'react'
import '../CSS/style.css'
import Multipleuser from '../Features/Multipleuser'
import Openenduser from '../Features/Openenduser'
import Rankinguser from '../Features/Rankinguser'
import Wordclouduser from '../Features/Wordclouduser'
import serviceApi from '../firebase/serviceApi'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useState,useEffect} from 'react'
import { db } from "../firebase/firebase";
import { useParams } from 'react-router-dom'
const User = (props) => {


    const {docId} = useParams()
    const [filter,setFilter] = useState([])
    const [indexFilterShow,setIndexFilterShow] = useState(0)
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState('')
    const [checkUser,setCheckUser] = useState(false)
    
    let docRef = db.collection("Form").doc(docId);
    const [answerUser,setanswerUser] = useState([])

    useEffect (() => {
        serviceApi.getPaper(docId,getSuccess);
      }, []);
    

    const getSuccess = (workdata)=> {
    console.log("workdata",workdata);   
    setFilter(workdata.filter)
    setLoading(false)
    }
    
    useEffect (()=>{
      docRef.collection("answers")
      .onSnapshot((querySnapshot) => {
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


console.log("User",indexFilterShow)
if(loading){
  return(
    <h1>loading</h1>
  )
}

  if(filter.length === 0){
    return(
      <h1>{docId}</h1>
    )
  }
  if(!checkUser){
    return(
        <div class="row" style={{padding:40}}> 
            <h1 style={{fontFamily:"serif"}}>Hello</h1>
            <h3 style={{fontFamily:"serif"}}>Please enter your name or student code.</h3>
            <TextField
            id="outlined-basic"
            label="Your ID"
            margin="normal"
            variant="outlined"
            onChange={(e)=>setUser(e.target.value)}
            inputProps={{style: {fontSize: 16}}}
            InputLabelProps={{style: {fontSize: 14}}} 
        />
            <Button  variant="contained" onClick={()=>setCheckUser(true)} >Submit</Button>
        </div>
    )
   
  }
 console.log("name",props.user)
if (indexFilterShow === filter.length) {
    return(
    <div class="head" style={{marginTop:80}}>
        <h1>Thank You</h1>
    </div>
)  
}

  if (filter[indexFilterShow].featuresWork  === "rank") {

    return (
        <div className="content-container1"> 
          <Rankinguser data={filter[indexFilterShow]} indexFilterShow={indexFilterShow} setIndexFilterShow={setIndexFilterShow} docId={docId} user={user} answerUser={answerUser}/>
        </div>
    )
  }
  else if (filter[indexFilterShow].featuresWork === "open") {
    return (
      <div className="content-container1">
        <Openenduser  data={filter[indexFilterShow]} indexFilterShow={indexFilterShow} setIndexFilterShow={setIndexFilterShow} docId={docId} user={user} answerUser={answerUser}/>
      </div>
    )
  }
  else if (filter[indexFilterShow].featuresWork  === "word") {
    return (
      <div className="content-container1">
        <Wordclouduser data={filter[indexFilterShow]} indexFilterShow={indexFilterShow} setIndexFilterShow={setIndexFilterShow} docId={docId} user={user} answerUser={answerUser}/>
      </div>
    )
  }
  else if (filter[indexFilterShow].featuresWork  === "multiple") {
    return (
      <div className="content-container1">
        <Multipleuser data={filter[indexFilterShow]} indexFilterShow={indexFilterShow} setIndexFilterShow={setIndexFilterShow} docId={docId} user={user} answerUser={answerUser}/>
        
      </div>
    )
  }
  else if (filter[indexFilterShow].featuresWork === "QRcode") {
    {setIndexFilterShow(indexFilterShow+1)}
    }

  


  return (
    <div className="content-container1">error</div>
  )
}

export default User
  