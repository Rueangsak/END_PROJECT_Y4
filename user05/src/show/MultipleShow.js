import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { layoutSpacing } from '../design-system/tokens/spacing';

/** Live display / presenter mirror of multiple-choice — read-only preview of question */
export default function MultipleShow(props) {
  const [value, setValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Stack spacing={2} sx={{ p: layoutSpacing.pageX, width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: '100%' }} variant="standard">
          <FormLabel id="multiple-show-quiz">{props.data.question}</FormLabel>
          <RadioGroup aria-labelledby="multiple-show-quiz" name="quiz" value={value} onChange={(e) => setValue(e.target.value)}>
            {props.data.ans.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.text}
                control={
                  <Radio />
                }
                label={option.text}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </form>
    </Stack>
  );
}
