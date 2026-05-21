import React,{useEffect, useState} from 'react'

import Newslide from '../c-presen/newslide'
import Paperpre from '../c-presen/paperpre'
import Bigpaper from '../c-presen/bigpaper'
import Content from '../c-presen/content'
import '../CSS/open.css'
import '../CSS/navbar2.css'
import { db } from "../firebase/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useParams } from 'react-router-dom'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Link } from "react-router-dom"

import QRCode from 'qrcode';
import serviceApi from '../firebase/serviceApi'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Open = (props) => {

  // const [img,setImg] = useState(["https://www.w3schools.com/howto/img_nature.jpg"])
  // const [imgShow,setImgShow] = useState("")
  // const [indexShow,setIndexShow] = useState(0)


  const { docId } = useParams();
  const [img,setImg] = useState([])
  const [loading,setLoading] = useState(true)
  const [filter,setFilter] = useState([])
  const [indexFilterShow,setIndexFilterShow] = useState(0)

  const [open, setOpen] = React.useState(false) 
  const handleOpen = () =>{
    setOpen(true)
    generateQrCode()
   
    
  }
 
  const handleClose = () => setOpen(false)

  const addImg=(newImg)=>{
    setImg([...img,newImg])
  }

  //เเอด filter 
  const addfilter = (newfilter)=>{
    console.log([...filter,newfilter]);
    setFilter([...filter,newfilter])
  }

  //ลบ filter
  const deteleFilter = (oldIndex)=>{
    let newFileter = filter
    newFileter = newFileter.filter((value, index)=>index!==oldIndex) 
    setFilter([...newFileter])
  }

  //บันทึกข้อมูลสำเสร็จ
  const saveSuccess = ()=> {
    alert("Save Success")
  }

  //บันทึกข้อมูล
  const save = ()=> {
    serviceApi.updatePaper(docId,filter,saveSuccess)
    
  }

  //ดึงข้อมูลมาเเสดงหน้า preper
  const getSuccess = (workdata)=> {
    console.log("workdata",workdata);
    setFilter(workdata.filter)
    setLoading(false)
    
  }
  
  //ลบคำตอบทั้งหมด
  const handleDeleteCollection = () => {
    getDocs(collection(doc(db, "Form", docId), "answers"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      })
      .then(() => {
        alert("Collection successfully deleted!");
        console.log("Collection successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting collection: ", error);
      });
  };
  
  useEffect (() => {
    serviceApi.getPaper(docId,getSuccess);
  }, []);


  //สร้าง QR code
  const [imageUrl, setImageUrl] = useState('');
  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL("https://teaching-project-a8687.web.app/User/"+docId)
          setImageUrl(response);
    }catch (error) {
      console.log(error);     
    }
  }


  //ถ้ายังไม่ได้โหลดข้อมูล
  if(loading){
    return(
      <h1 style={{textAlign:"center",fontFamily:"Georgia"}}>Loading...</h1>
    )
  }
  const result = ()=> {
    window.location = "https://project-01tt.web.app/Open/"+docId;
  }

  
  return (
    <div className="page-container">

      {/* <h1 style={{textAlign:"center",fontFamily:"Georgia"}}>Document ID : {docId}</h1> */}
      <div className="navbar2-container">
        <div className="navbar2-navbar navbar-container">
          <div className="navbar2-max-width max-width">
            <span className="navbar2-text">presentation</span>
            
              <button className="navbar2-button button" onClick={()=>save()}>save</button>
              <button className="navbar2-button button"  onClick={()=>result()}>Show results</button>
              <button className="navbar2-button1 button" onClick={handleOpen} >QR Code</button> 
             
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                      {imageUrl ? (
                    <div style={{alignItems:"center", display:"block",marginLeft:80,marginRight:"auto"}}><img src={imageUrl} style={{width:220,height:220}} alt="img"/></div>
                ) : null
            }
                      </Box>
                    </Modal>
                    </div>
        </div>
      </div>


        <Newslide funButton={addImg} addfilter={addfilter}/>
      <div className="page-container1">
        <div className="page-container2">
          <Paperpre filter={filter} setIndexFilterShow={setIndexFilterShow}/> 
        </div>
        <div className="page-container3"> 
          <Bigpaper indexFilterShow={indexFilterShow} filter={filter}/>
        </div>
        <div className="page-container4">
            <h3 style={{fontFamily:"Serif",textAlign:"center",}}>Content</h3>
            <Content indexFilterShow={indexFilterShow} filter={filter} setFilter={setFilter} deteleFilter={deteleFilter}/>
            <button style={{padding:10,backgroundColor:"green ",marginTop:10,marginLeft:50,marginRight:50,color:"white"}} onClick={handleDeleteCollection}>Delete Collection</button>
          
        </div>
      </div>
    </div>
  )
}



export default Open
