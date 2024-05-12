import React, {useState} from 'react';
import {Container, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import QRCode from 'qrcode';



function QR() {

  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const classes = useStyles();


  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }




  return (
    <Container className={classes.conatiner}>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
            <Button className={classes.btn} variant="contained" 
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

const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
    }));

export default QR;
