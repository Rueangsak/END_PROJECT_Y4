import React from 'react'
import '../CSS/bigpaper.css'
import TextField from '@mui/material/TextField';

import QR from './QR'


const BigpaperShow = (props) => {



  // console.log("Bigpaper" , props);

  if(props.filter.length === 0){

    return(
      <h1>ยังไม่มีคำถาม</h1>
    )
  }

  else if (props.filter[props.indexFilterShow].featuresWork === "rank") {
    return (
      <div className="bigpaper-container1">
      <div className="bigpaper-container" style={{width:1020,height:700}}>

        {/* <Multiple title={props.imgShow.tit} ans={props.imgShow.items}/> */}

        <h1>{"Ranking :" + (props.indexFilterShow+1) }</h1>
        <h1>{"question :" + props.filter[props.indexFilterShow].question}</h1> 
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
        <div className="bigpaper-container" style={{width:2000,height:700}}>
          <h1>{"Openend :" + (props.indexFilterShow+1) }</h1>
          <h1>{"question :" + props.filter[props.indexFilterShow].question}</h1> 
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
        <h1>{"question :" + props.filter[props.indexFilterShow].question}</h1> 
        {props.filter[props.indexFilterShow].ans.map((index)=>{
          return(
            <div key={index}></div>
          )
        }
        )}
        {/* <WordCloud/> */}
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
          <h1>{"question :" + props.filter[props.indexFilterShow].question}</h1> 
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

export default BigpaperShow
