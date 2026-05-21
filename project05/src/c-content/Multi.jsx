import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { AppButton, AppInput, AppSection } from '../design-system';
import { layoutSpacing } from '../design-system/tokens/spacing';

export default function Multi(props) {
  const updateFilter = (updater) => {
    const next = props.filter.map((slide, i) =>
      i === props.indexFilterShow ? updater({ ...slide }) : slide
    );
    props.setFilter(next);
  };

  const changeQuestion = (text) => {
    updateFilter((slide) => {
      slide.question = text;
      return slide;
    });
  };

  const changeStatus = (indexNewStatus) => {
    updateFilter((slide) => {
      if (slide.ans[indexNewStatus]?.status) return slide;
      slide.ans = slide.ans.map((item, index) => ({
        ...item,
        status: index === indexNewStatus,
      }));
      return slide;
    });
  };

  const changeTextAns = (newText, index) => {
    updateFilter((slide) => {
      slide.ans = slide.ans.map((item, i) => (i === index ? { ...item, text: newText } : item));
      return slide;
    });
  };

  const addAns = () => {
    updateFilter((slide) => {
      slide.ans = [...slide.ans, { text: '', status: slide.ans.length === 0 }];
      return slide;
    });
  };

  const deleteAns = (oldIndex) => {
    updateFilter((slide) => {
      slide.ans = slide.ans.filter((_, index) => index !== oldIndex);
      return slide;
    });
  };

  const answers = props.filter[props.indexFilterShow]?.ans ?? [];

  return (
    <AppSection title="Multiple choice">
      <AppButton color="error" variant="contained" onClick={() => props.deteleFilter(props.indexFilterShow)}>
        Delete slide
      </AppButton>
      <AppInput
        label="Your question"
        value={props.filter[props.indexFilterShow].question}
        onChange={(e) => changeQuestion(e.target.value)}
      />
      <AppButton variant="outlined" onClick={addAns}>
        Add option
      </AppButton>
      <RadioGroup
        name="multi-correct"
        aria-label="Mark the correct answer"
        value={String(answers.findIndex((a) => a.status))}
        onChange={(e) => changeStatus(Number(e.target.value))}
      >
        <Stack spacing={layoutSpacing.form}>
          {answers.map((data, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              <FormControlLabel
                value={String(index)}
                control={<Radio />}
                label={`Correct · option ${index + 1}`}
                sx={{ m: 0, minWidth: { xs: '100%', sm: 160 } }}
              />
              <AppInput
                label={`Option ${index + 1}`}
                value={data.text}
                onChange={(e) => changeTextAns(e.target.value, index)}
                sx={{ flex: 1 }}
              />
              <AppButton
                size="small"
                variant="outlined"
                color="error"
                onClick={() => deleteAns(index)}
                aria-label={`Remove option ${index + 1}`}
              >
                Remove
              </AppButton>
            </Stack>
          ))}
        </Stack>
      </RadioGroup>
    </AppSection>
  );
}
