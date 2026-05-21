import Typography from '@mui/material/Typography';
import { AppButton, AppInput, AppSection } from '../design-system';

export default function QA(props) {
  const changeQuestion = (text) => {
    const newFileter = props.filter;
    newFileter[props.indexFilterShow].question = text;
    props.setFilter([...newFileter]);
  };

  return (
    <AppSection title="Q&A" subtitle="Let the audience ask questions without a designated Q&A slide.">
      <AppButton color="error" variant="contained" onClick={() => props.deteleFilter(props.indexFilterShow)}>
        Delete Slide
      </AppButton>
      <AppInput
        label="Your question"
        value={props.filter[props.indexFilterShow].question}
        onChange={(e) => changeQuestion(e.target.value)}
      />
      <Typography variant="body2" color="text.secondary">
        Configure the prompt shown to participants for this slide.
      </Typography>
    </AppSection>
  );
}
