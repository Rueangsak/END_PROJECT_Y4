import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../firebase/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { AppButton } from '../design-system';
import { ParticipantQuestion } from '../layout';

export default function Multipleuser(props) {
  const { docId } = useParams();
  const [check, setCheck] = useState(true);
  const [answer, setAnswer] = useState('');
  const [Checkans, setCheckans] = useState(null);
  const [Checkbtn, setCheckbtn] = useState(true);
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const step = props.step ?? props.indexFilterShow + 1;
  const total = props.totalSlides ?? 1;

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCheckbtn(false);
    if (Checkans === true) {
      setHelperText('You got it right!');
      setError(false);
    } else if (Checkans === false) {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  const docRef = doc(db, 'Form', docId);

  const handleAddAnswer = () => {
    addDoc(collection(docRef, 'answers'), {
      answer,
      user: props.user,
      index: props.indexFilterShow,
      status: Checkans,
    })
      .then(() => {
        setAnswer('');
        setCheck(false);
      })
      .catch((err) => console.error('Error adding answer: ', err));
  };

  if (check) {
    return (
      <ParticipantQuestion
        question={props.data.question}
        step={step}
        totalSteps={total}
        primaryAction={
          <Stack spacing={1.5} sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ width: '100%' }} error={error} variant="standard">
                <FormLabel id="multiple-quiz">{props.data.question}</FormLabel>
                <RadioGroup aria-labelledby="multiple-quiz" name="quiz" value={value} onChange={handleRadioChange}>
                  {props.data.ans.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option.text}
                      control={
                        <Radio
                          onClick={() => {
                            if (Checkbtn) {
                              setAnswer(option.text);
                              setCheckans(option.status);
                            }
                          }}
                        />
                      }
                      label={option.text}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <AppButton sx={{ mt: 1 }} type="submit" variant="outlined">
                  Check answer
                </AppButton>
              </FormControl>
            </form>
            <AppButton variant="contained" onClick={handleAddAnswer} disabled={!answer}>
              Submit
            </AppButton>
          </Stack>
        }
      />
    );
  }

  return (
    <ParticipantQuestion
      question={props.data.question}
      step={step}
      totalSteps={total}
      primaryAction={
        <AppButton
          variant="contained"
          fullWidth
          onClick={() => {
            props.setIndexFilterShow(props.indexFilterShow + 1);
            setCheck(true);
            setCheckbtn(true);
            setValue('');
            setError(false);
          }}
        >
          Next question
        </AppButton>
      }
    />
  );
}
