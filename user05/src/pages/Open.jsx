import React,{useEffect, useState} from 'react'

import Paperpre from './paperpre'
import Bigpaper from './bigpaper'

import '../CSS/open.css'
import '../CSS/navbar2.css'
import { db } from "../firebase/firebase";
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

import { useParams } from 'react-router-dom';
import serviceApi from '../firebase/serviceApi'



const Open = (props) => {


  const { docId } = useParams();
  const [img,setImg] = useState([])
  const [loading,setLoading] = useState(true)
  const [filter,setFilter] = useState([])
  const [indexFilterShow,setIndexFilterShow] = useState(0)

  
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


  const handleDeleteCollection = () => {
    getDocs(collection(doc(db, "Form", docId), "answers"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      })
      .then(() => {
        console.log("Collection successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting collection: ", error);
      });
  };
  
  useEffect (() => {
    serviceApi.getPaper(docId,getSuccess);
  }, []);



  


  //ถ้ายังไม่ได้โหลดข้อมูล
  if(loading){
    return(
      <h1 style={{textAlign:"center",fontFamily:"Georgia"}}>Loading...</h1>
    )
  }

  return (

    <div className="page-container">
      <div className="navbar2-container">
        <div className="navbar2-navbar navbar-container">
          <div className="navbar2-max-width max-width" style={{paddingTop:20,paddingLeft:20}}> 
            <span className="navbar2-text">presentation</span>
           
              
          </div>
        </div>
      </div>


        
      <div className="page-container1">
        <div className="page-container2">
          <Paperpre filter={filter} setIndexFilterShow={setIndexFilterShow}/> 
        </div>
        <div className="page-container3">
          <Bigpaper indexFilterShow={indexFilterShow} filter={filter} />
        </div>
        
        
       
      
        
      </div>
    </div>
  )
}


export default Open
