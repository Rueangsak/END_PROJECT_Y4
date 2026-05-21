import { SlideCanvas } from '../layout';
import LiveSlideContent from './LiveSlideContent';
import QR from './QR';

const slideTypeLabel = {
  rank: 'Ranking',
  open: 'Open-ended',
  word: 'Word cloud',
  multiple: 'Multiple choice',
  QRcode: 'QR',
};

export default function BigpaperShow({ filter, indexFilterShow, answerUser = [] }) {
  if (!filter?.length) {
    return <SlideCanvas emptyMessage="No slides in this session yet" />;
  }

  const slide = filter[indexFilterShow];
  if (!slide) {
    return <SlideCanvas emptyMessage="Select a slide" />;
  }

  const label = slideTypeLabel[slide.featuresWork] || slide.featuresWork;

  if (slide.featuresWork === 'QRcode') {
    return (
      <SlideCanvas title={`${label} · ${indexFilterShow + 1}`}>
        <QR />
      </SlideCanvas>
    );
  }

  return (
    <SlideCanvas title={`${label} · ${indexFilterShow + 1}`} subtitle={slide.question}>
      <LiveSlideContent slide={slide} indexFilterShow={indexFilterShow} answerUser={answerUser} />
    </SlideCanvas>
  );
}
