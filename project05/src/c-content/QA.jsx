import * as React from 'react';
import Box from '@mui/material/Box';
  import TextField from '@mui/material/TextField';


export default function QA(props) {


      //เปลี่ยนคำถาม
      const changeQuestion=(text)=>{
        let newFileter = props.filter
        newFileter[props.indexFilterShow].question = text
        props.setFilter([...newFileter])
      } 
    

  
  return (
    <div><p style={{padding:10 }}>Q&A</p>
    <p style={{padding:10 }}><br/> If you want to let the audience ask you questions without a designated Q&A slide</p>
    <button style={{padding:10,backgroundColor:"red",marginLeft:20,marginBottom:20,color:"white"}} onClick={()=>props.deteleFilter(props.indexFilterShow)}>Delete Slide</button>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Your question" variant="outlined" value={props.filter[props.indexFilterShow].question} onChange={(e)=>changeQuestion(e.target.value)}/>
      {/* <TextField id="outlined-basic" label="Your question" variant="outlined" value={props.imgShow.tit} onChange={(e)=>props.changtit(e.target.value)} /> */}
    </Box>

 
</div>
      
      
  );
}

