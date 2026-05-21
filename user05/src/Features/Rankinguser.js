import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../firebase/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { AppButton } from '../design-system';
import { ChartPanel, ParticipantQuestion } from '../layout';

export default function Rankinguser(props) {
  const { docId } = useParams();
  const [check, setCheck] = useState(true);
  const [answer, setAnswer] = useState('');
  const docRef = doc(db, 'Form', docId);
  const step = props.step ?? props.indexFilterShow + 1;
  const total = props.totalSlides ?? 1;

  const handleAddAnswer = () => {
    if (!answer) return;
    addDoc(collection(docRef, 'answers'), {
      answer,
      user: props.user,
      index: props.indexFilterShow,
    })
      .then(() => {
        setCheck(false);
        setAnswer('');
      })
      .catch((error) => console.error('Error adding answer: ', error));
  };

  const filteredAnswers = props.answerUser.filter((data) => data.index === props.indexFilterShow);
  const chartData = {
    labels: filteredAnswers.map((data) => data.answer),
    datasets: [
      {
        label: 'Votes',
        data: filteredAnswers.map((data) => data.count),
        backgroundColor: ['#0B57D0', '#4F46E5', '#15803D', '#B45309', '#64748B'],
        borderWidth: 0,
      },
    ],
  };

  if (check) {
    const options = props.data.ans?.length
      ? props.data.ans
      : props.answerUser.filter((data) => data.index === props.indexFilterShow);

    return (
      <ParticipantQuestion
        question={props.data.question}
        step={step}
        totalSteps={total}
        primaryLabel="Submit answer"
        onPrimary={handleAddAnswer}
        primaryDisabled={!answer}
      >
        <RadioGroup value={answer} onChange={(e) => setAnswer(e.target.value)} name="ranking-options">
          <Stack spacing={1}>
            {(options.length ? options : [{ text: 'No options yet' }]).map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.text || option.answer || ''}
                control={<Radio />}
                label={option.text || option.answer || 'Option'}
                disabled={!option.text && !option.answer}
              />
            ))}
          </Stack>
        </RadioGroup>
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
      <ChartPanel
        title="Live results"
        subtitle="How the class voted so far"
        empty={filteredAnswers.length === 0 ? 'Waiting for responses' : undefined}
      >
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </ChartPanel>
    </ParticipantQuestion>
  );
}
