import React,{useState} from 'react'
// import PropTypes from 'prop-types'

import '../CSS/newslide.css'

import Button from '@mui/material/Button';
const Newslide = (props) => {


  //const [imgData,setImgData] = useState([{name:"rank",items:[],tit:"",url:"../../img/rank.jpg"},{name:"open",items:[],tit:"",url:"../../img/open.jpg"},{name:"word",items:[],tit:"",url:"../../img/word.jpg"},{name:"multi",items:[],tit:"",url:"../../img/multi.jpg"}])
  const [showData,setShowData] = useState(false)



  return (
    <div className="newslide-container">
      <div className="newslide1">

        <Button variant="contained" class="button-88" onClick={()=>setShowData(!showData)}>New Slide</Button>
        {showData? 
        

        <div>
          <img src={"../../img/rank.jpg"} style={{width:80,height:40,paddingRight:5,paddingLeft:5,paddingTop:2}} 
              onClick={()=>props.addfilter(
                {
                  featuresWork: "rank" ,   
                  question:"",
                  ans:[]
                }
              )}
          />
          <img src={"../../img/open.jpg"} style={{width:80,height:40,paddingRight:5,paddingLeft:5,paddingTop:2}} 
              onClick={()=>props.addfilter(
                {
                  featuresWork: "open" ,   
                  question:"",
                  ans:[]
                }
              )}
          />
          <img src={"../../img/word.jpg"} style={{width:80,height:40,paddingRight:5,paddingLeft:5,paddingTop:2}} 
              onClick={()=>props.addfilter(
                {
                  featuresWork: "word" ,   
                  question:"",
                  ans:[]
                  
                }
              )}
          />
          <img src={"../../img/multi.jpg"} style={{width:80,height:40,paddingRight:5,paddingLeft:5,paddingTop:2}} 
              onClick={()=>props.addfilter(
                {
                  featuresWork: "multiple" ,   
                  question:"",
                  ans:[]
                }
              )}
          />
                    {/* <img src={"../../img/qr-code-scan.png"} style={{width:35,height:35,paddingRight:5,paddingLeft:5,paddingTop:2}} 
              onClick={()=>props.addfilter(
                {
                  featuresWork: "QRcode" ,   
                  srcQRcode:"", 
                }
              )}
          /> */}
        </div>
        :
        <></>}
      </div>
    </div>
  )
}


export default Newslide
