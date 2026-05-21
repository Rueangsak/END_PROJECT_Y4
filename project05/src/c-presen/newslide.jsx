import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { AppButton } from '../design-system';

const slideTypes = [
  { label: 'Ranking', featuresWork: 'rank' },
  { label: 'Open-ended', featuresWork: 'open' },
  { label: 'Word cloud', featuresWork: 'word' },
  { label: 'Multiple choice', featuresWork: 'multiple' },
];

const Newslide = (props) => {
  const [showData, setShowData] = useState(false);

  const addSlide = (featuresWork) => {
    props.addfilter({
      featuresWork,
      question: '',
      ans: [],
    });
    setShowData(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderBottom: 2,
        borderColor: 'error.light',
        py: { xs: 1, md: 1.5 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }}>
        <AppButton
          variant="contained"
          onClick={() => setShowData(!showData)}
          aria-expanded={showData}
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
        >
          New slide
        </AppButton>
        {showData && (
          <Stack direction="row" spacing={1} flexWrap="wrap" role="group" aria-label="Slide types">
            {slideTypes.map((type) => (
              <AppButton
                key={type.featuresWork}
                size="small"
                variant="outlined"
                onClick={() => addSlide(type.featuresWork)}
              >
                {type.label}
              </AppButton>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Newslide;
