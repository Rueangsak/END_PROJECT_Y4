import { AppButton, AppInput, AppSection } from '../design-system';

export default function WordCloud(props) {
  const changeQuestion = (text) => {
    const newFileter = props.filter;
    newFileter[props.indexFilterShow].question = text;
    props.setFilter([...newFileter]);
  };

  return (
    <AppSection title="Word Cloud">
      <AppButton color="error" variant="contained" onClick={() => props.deteleFilter(props.indexFilterShow)}>
        Delete Slide
      </AppButton>
      <AppInput
        label="Your question"
        value={props.filter[props.indexFilterShow].question}
        onChange={(e) => changeQuestion(e.target.value)}
      />
    </AppSection>
  );
}
