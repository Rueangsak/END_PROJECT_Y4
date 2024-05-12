import { red } from '@mui/material/colors'
import React from 'react'

import '../CSS/paperpre.css'

const Paperpre = (props) => {
  return (
    <div className="paperpre-container">
      <div className ="paperpre-container1">
          <div className="row">
            {props.filter.map((data,index)=>{
              return(
                <div className ="paperpre-container2" style={{marginBottom:5,marginTop:10}} key={index} onClick={()=>props.setIndexFilterShow(index)}>
                  <h1 class='btnpre'>{data.featuresWork + " : "+(index+1)}</h1>
                </div>
              )
            })}
          </div>
      </div>
    </div>
  )
}

export default Paperpre
