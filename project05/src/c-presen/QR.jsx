import React, {useState} from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';
import QRCode from 'qrcode';



function QR() {

  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }




  return (
    <Container sx={{ mt: 1 }}>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
            <Button sx={{ mt: 1, mb: 2 }} variant="contained" 
                color="primary" onClick={() => generateQrCode()}>Generate</Button>
                <br/>
                <br/>
                <br/>
                {imageUrl ? (
                    <img src={imageUrl} alt="img"/>
                ) : null}
        </Grid>
    </Container>
  );
}

export default QR;
