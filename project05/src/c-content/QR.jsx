import * as React from 'react';

export default function QR(props) {

  return (  
    <div><p style={{padding:10 }}>QRcode</p>
    <p style={{padding:10 }}><br/>Generate QRcode</p>
    <button style={{padding:10,backgroundColor:"red",marginLeft:20,marginBottom:20,color:"white"}} onClick={()=>props.deteleFilter(props.indexFilterShow)}>Delete Slide</button>
</div>
      
      
  );
}

