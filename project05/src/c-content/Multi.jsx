import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Multi(props) {
  

  //เปลี่ยนคำถาม
  const changeQuestion=(text)=>{
    let newFileter = props.filter
    newFileter[props.indexFilterShow].question = text
    props.setFilter([...newFileter])
  }


  //เปลี่ยนสถานะของคำตอบ
  const changeStatus=(indexNewStatus)=>{
    let newFileter = props.filter
    if(newFileter[props.indexFilterShow].ans[indexNewStatus].status)
      return
    newFileter[props.indexFilterShow].ans.forEach((data,index)=>{
      if(index === indexNewStatus){
        data.status = true
      }else{
        data.status = false
      }
    })
    
    props.setFilter([...newFileter])
  }

  //เปลี่ยนข้อความของคำตอบ
  const changeTextAns=(newText,index)=>{
    let newFileter = props.filter
    newFileter[props.indexFilterShow].ans[index].text = newText
    props.setFilter([...newFileter])
  }


  //เพิ่มคำตอบ
  const addAns=()=>{
    let newFileter = props.filter
    newFileter[props.indexFilterShow].ans.push(
      {
        text:"",
        status:props.filter[props.indexFilterShow].ans.length===0
      }
    )
    props.setFilter([...newFileter])
  }


  //ลบคำตอบ
  const deleteAns=(oldIndex)=>{
    let newFileter = props.filter
    newFileter[props.indexFilterShow].ans = newFileter[props.indexFilterShow].ans.filter((value, index)=>index!==oldIndex) 
    props.setFilter([...newFileter])
  }


  
  return (
    <div><p style={{padding:10 }}>Multiple choice</p>
      <button style={{padding:10,backgroundColor:"red",marginLeft:20,marginBottom:20,color:"white"}} onClick={()=>props.deteleFilter(props.indexFilterShow)}>Delete</button>
      <Box
        component="form"
        sx={{'& > :not(style)': { m: 1, width: '40ch' },}}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Your question" variant="outlined" value={props.filter[props.indexFilterShow].question} onChange={(e)=>changeQuestion(e.target.value)}/>
      </Box>
      <button style={{paddingRight:50,marginLeft:20,marginTop:20}} onClick={()=>addAns()}>Add Item</button>
      
      {props.filter[props.indexFilterShow].ans.map((data,index)=>{
          return(
            <div key={index}>
              <TextField label="Item"  value={data.text} style={{padding:10,marginTop:20}} onChange={(e)=>changeTextAns(e.target.value,index)} />
              <input type="radio"  name="status" checked={data.status} onClick={()=>changeStatus(index)} />
              <button style={{marginTop:18}} onClick={()=>deleteAns(index)}>x</button>
            </div>
          )
        }
      )}


  
    </div>
        
      
  );
}

