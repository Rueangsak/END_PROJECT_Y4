import Stack from '@mui/material/Stack';
import { AppButton, AppInput, AppSection } from '../design-system';
import { layoutSpacing } from '../design-system/tokens/spacing';

export default function Ranking(props) {
  const changeQuestion = (text) => {
    const newFileter = props.filter;
    newFileter[props.indexFilterShow].question = text;
    props.setFilter([...newFileter]);
  };

  const changeTextAns = (newText, index) => {
    const newFileter = props.filter;
    newFileter[props.indexFilterShow].ans[index].text = newText;
    props.setFilter([...newFileter]);
  };

  const addAns = () => {
    const newFileter = props.filter;
    newFileter[props.indexFilterShow].ans.push({
      text: '',
      status: props.filter[props.indexFilterShow].ans.length === 0,
    });
    props.setFilter([...newFileter]);
  };

  const deleteAns = (oldIndex) => {
    const newFileter = props.filter;
    newFileter[props.indexFilterShow].ans = newFileter[props.indexFilterShow].ans.filter(
      (_, index) => index !== oldIndex
    );
    props.setFilter([...newFileter]);
  };

  return (
    <AppSection title="Ranking">
      <AppButton color="error" variant="contained" onClick={() => props.deteleFilter(props.indexFilterShow)}>
        Delete
      </AppButton>
      <AppInput
        id="ranking-question"
        label="Your question"
        value={props.filter[props.indexFilterShow].question}
        onChange={(e) => changeQuestion(e.target.value)}
      />
      <AppButton variant="outlined" onClick={() => addAns()}>
        Add Item
      </AppButton>
      <Stack spacing={layoutSpacing.form}>
        {props.filter[props.indexFilterShow].ans.map((data, index) => (
          <Stack key={index} direction="row" spacing={1} alignItems="center">
            <AppInput
              label="Item"
              value={data.text}
              onChange={(e) => changeTextAns(e.target.value, index)}
              sx={{ flex: 1 }}
            />
            <AppButton size="small" variant="outlined" color="error" onClick={() => deleteAns(index)}>
              ×
            </AppButton>
          </Stack>
        ))}
      </Stack>
    </AppSection>
  );
}
