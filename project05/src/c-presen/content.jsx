import React from 'react'
import Ranking from '../c-content/Ranking'
import QA from '../c-content/QA'
import Multi from '../c-content/Multi'
import WordCloud from '../c-content/WordCloud'
import QR from '../c-content/QR'

import '../CSS/content.css'





const Content = (props) => {
  console.log("Content",props.filter[props.indexFilterShow] )
  if(props.filter.length === 0){
    return(
      <h1>ยังไม่มีคำถาม</h1>
    )
  }

  if (props.filter[props.indexFilterShow].featuresWork  === "rank") {

    return (
      <div className="content-container1"> 
        <Ranking indexFilterShow={props.indexFilterShow} filter={props.filter} setFilter={props.setFilter}  deteleFilter={props.deteleFilter}/>
        {/* <Ranking indexShow={props.indexShow} imgShow={props.imgShow} changdata={props.changdata} changtit={props.changtit} /> */}
      </div>
    )
  }
  else if (props.filter[props.indexFilterShow].featuresWork === "open") {
    return (
      <div className="content-container1">
        {/* <QA imgShow={props.imgShow} changtit={props.changtit}/> */}
        <QA indexFilterShow={props.indexFilterShow} filter={props.filter} setFilter={props.setFilter}  deteleFilter={props.deteleFilter}/>
      </div>
    )
  }
  else if (props.filter[props.indexFilterShow].featuresWork  === "word") {
    return (
      <div className="content-container1">
        <WordCloud indexFilterShow={props.indexFilterShow} filter={props.filter} setFilter={props.setFilter}  deteleFilter={props.deteleFilter}/>
      </div>
    )
  }
  else if (props.filter[props.indexFilterShow].featuresWork  === "multiple") {
    return (
      <div className="content-container1">
        <Multi indexFilterShow={props.indexFilterShow} filter={props.filter} setFilter={props.setFilter}  deteleFilter={props.deteleFilter}/>
        
      </div>
    )
  }
  else if (props.filter[props.indexFilterShow].featuresWork  === "QRcode") {
    return (
      <div className="content-container1">
        <QR indexFilterShow={props.indexFilterShow} filter={props.filter} setFilter={props.setFilter}  deteleFilter={props.deteleFilter}/>
        
      </div>
    )
  }

  return (
    <div className="content-container1"></div>
  )
}

export default Content
  