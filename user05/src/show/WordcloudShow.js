import Box from '@mui/material/Box';
import WordCloud from 'react-wordcloud';

export default function WordcloudShow(props) {
  const words = props.answerUser
    .filter((data) => data.index === props.indexFilterShow)
    .map((data) => ({ text: data.answer, value: data.count }));

  return (
    <Box sx={{ width: '100%', height: { xs: 280, md: 400 }, p: 2 }}>
      {words.length > 0 ? <WordCloud words={words} /> : null}
    </Box>
  );
}
