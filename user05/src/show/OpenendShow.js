import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { layoutSpacing } from '../design-system/tokens/spacing';

export default function OpenendShow(props) {
  const responses = props.answerUser.filter((data) => data.index === props.indexFilterShow);

  return (
    <Stack spacing={1} sx={{ p: layoutSpacing.pageX, width: '100%' }}>
      {responses.map((data, i) => (
        <Chip
          key={i}
          label={`${data.user}: ${data.answer}`}
          variant="outlined"
          sx={{ height: 'auto', py: 1, justifyContent: 'flex-start' }}
        />
      ))}
    </Stack>
  );
}
