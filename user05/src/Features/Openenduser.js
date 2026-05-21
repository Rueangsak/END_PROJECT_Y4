import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { db } from '../firebase/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { AppButton, AppInput } from '../design-system';
import { ParticipantQuestion } from '../layout';

export default function Openenduser(props) {
  const [answer, setAnswer] = useState('');
  const [check, setCheck] = useState(true);
  const docRef = doc(db, 'Form', props.docId);
  const step = props.step ?? props.indexFilterShow + 1;
  const total = props.totalSlides ?? 1;

  const handleAddAnswer = () => {
    if (!answer.trim()) return;
    addDoc(collection(docRef, 'answers'), {
      answer: answer.trim(),
      user: props.user,
      index: props.indexFilterShow,
    })
      .then(() => {
        setCheck(false);
        setAnswer('');
      })
      .catch((error) => console.error('Error adding answer: ', error));
  };

  const responses = props.answerUser.filter((data) => data.index === props.indexFilterShow);

  if (check) {
    return (
      <ParticipantQuestion
        question={props.data.question}
        step={step}
        totalSteps={total}
        primaryLabel="Submit"
        onPrimary={handleAddAnswer}
        primaryDisabled={!answer.trim()}
      >
        <AppInput
          label="Your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          multiline
          minRows={3}
        />
      </ParticipantQuestion>
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
          }}
        >
          Next question
        </AppButton>
      }
    >
      <Stack spacing={1}>
        {responses.map((data, i) => (
          <Chip key={i} label={`${data.user}: ${data.answer}`} variant="outlined" sx={{ height: 'auto', py: 1 }} />
        ))}
      </Stack>
    </ParticipantQuestion>
  );
}
