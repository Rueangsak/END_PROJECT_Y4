import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Bar } from 'react-chartjs-2';
import WordCloud from 'react-wordcloud';
import { AppEmptyState } from '../design-system';
import { ChartContainer, ChartPanel } from '../layout';
import { answersForSlide, voteCountsForSlide } from '../hooks/useLiveAnswers';

const CHART_COLORS = ['#0B57D0', '#4F46E5', '#15803D', '#B45309', '#64748B'];

/**
 * Live participant results for the active slide (presenter / show view).
 */
export default function LiveSlideContent({ slide, indexFilterShow, answerUser }) {
  if (!slide) {
    return <AppEmptyState title="No slide selected" />;
  }

  if (slide.featuresWork === 'rank') {
    const votes = voteCountsForSlide(answerUser, indexFilterShow);
    const chartData = {
      labels: votes.map((v) => v.answer),
      datasets: [
        {
          label: 'Votes',
          data: votes.map((v) => v.count),
          backgroundColor: CHART_COLORS,
          borderWidth: 0,
        },
      ],
    };
    return (
      <ChartPanel title="Live ranking" empty={votes.length === 0 ? 'No votes yet' : undefined}>
        <ChartContainer>
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </ChartContainer>
      </ChartPanel>
    );
  }

  if (slide.featuresWork === 'open') {
    const responses = answersForSlide(answerUser, indexFilterShow);
    if (responses.length === 0) {
      return <AppEmptyState title="No responses yet" description="Answers will appear as participants submit." />;
    }
    return (
      <Stack spacing={1} sx={{ width: '100%' }}>
        {responses.map((data, i) => (
          <Chip
            key={`${data.user}-${i}`}
            label={`${data.user}: ${data.answer}`}
            variant="outlined"
            sx={{ height: 'auto', py: 1, justifyContent: 'flex-start' }}
          />
        ))}
      </Stack>
    );
  }

  if (slide.featuresWork === 'word') {
    const words = voteCountsForSlide(answerUser, indexFilterShow).map((v) => ({
      text: v.answer,
      value: v.count,
    }));
    if (words.length === 0) {
      return <AppEmptyState title="No words yet" />;
    }
    return (
      <ChartContainer minHeight={280}>
        <WordCloud words={words} />
      </ChartContainer>
    );
  }

  if (slide.featuresWork === 'multiple') {
    const votes = voteCountsForSlide(answerUser, indexFilterShow);
    const options = slide.ans || [];
    return (
      <Stack spacing={1} sx={{ width: '100%' }}>
        {options.map((opt, index) => {
          const vote = votes.find((v) => v.answer === opt.text);
          return (
            <Chip
              key={index}
              label={`${opt.text}${vote ? ` · ${vote.count} vote${vote.count !== 1 ? 's' : ''}` : ''}`}
              color={opt.status ? 'primary' : 'default'}
              variant={opt.status ? 'filled' : 'outlined'}
              sx={{ justifyContent: 'flex-start', height: 'auto', py: 1 }}
            />
          );
        })}
        {options.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No options configured.
          </Typography>
        )}
      </Stack>
    );
  }

  if (slide.featuresWork === 'QRcode') {
    return (
      <Typography variant="body2" color="text.secondary" textAlign="center">
        QR slide — participants are redirected automatically.
      </Typography>
    );
  }

  return <AppEmptyState title="Unsupported slide type" description={slide.featuresWork} />;
}
