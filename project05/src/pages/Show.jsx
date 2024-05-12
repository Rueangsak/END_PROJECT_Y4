import React,{useEffect, useState} from 'react'

import Newslide from '../c-presen/newslide'
import Paperpre from '../c-presen/paperpre'
import BigpaperShow from '../c-presen/bigpaper'
import Content from '../c-presen/content'
import '../CSS/open.css'
import '../CSS/navbar2.css'
import { Link } from "react-router-dom"



import { useParams } from 'react-router-dom';
import serviceApi from '../firebase/serviceApi'

const Show = (props) => {

  // const [img,setImg] = useState(["https://www.w3schools.com/howto/img_nature.jpg"])
  // const [imgShow,setImgShow] = useState("")
  // const [indexShow,setIndexShow] = useState(0)


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
        <div className="page-container2">
          <Paperpre filter={filter} setIndexFilterShow={setIndexFilterShow}/> 
        </div>
        <div className="page-container3">
          <BigpaperShow indexFilterShow={indexFilterShow} filter={filter}/>
        </div>
        
      
    </div>
  )
}


export default Show
