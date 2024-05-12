import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function Multiple(props) {
  console.log("propsMultiple",props);
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === 'best') {
      setHelperText('You got it!');
      setError(false);
    } else if (value === 'worst') {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };
   const testArr = [1,2,3,4,5]
  return (
    <form onSubmit={handleSubmit} >
      
      <FormControl sx={{ m: 5}} error={error} variant="standard">
        <FormLabel id="demo-error-radios" sx={{fontSize:20}}>{props.title} {props.one}</FormLabel>
        <FormLabel id="demo-error-radios" sx={{fontSize:20}}>{props.title} {props.one}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {props.ans.map((data,index)=>{
            return(
              <FormControlLabel value={data.text} control={<Radio sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                },}}/>} style={{fontSize:50,margin:30}} label={data.text} />
            )
          })}
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" style={{fontSize:20}}>
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}
