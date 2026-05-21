import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import WordCloud from 'react-wordcloud';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AppButton, AppInput } from '../design-system';
import { ParticipantQuestion } from '../layout';

export default function Wordclouduser(props) {
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

  const words = props.answerUser
    .filter((data) => data.index === props.indexFilterShow)
    .map((data) => ({ text: data.answer, value: data.count }));

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
          minRows={2}
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
      <Box sx={{ width: '100%', height: { xs: 280, md: 360 } }}>
        {words.length > 0 ? (
          <WordCloud words={words} />
        ) : (
          <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>No words yet</Box>
        )}
      </Box>
    </ParticipantQuestion>
  );
}
