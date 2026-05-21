import React from 'react';
import Ranking from '../c-content/Ranking';
import QA from '../c-content/QA';
import Multi from '../c-content/Multi';
import WordCloud from '../c-content/WordCloud';
import QR from '../c-content/QR';
import { AppEmptyState } from '../design-system';

const Content = (props) => {
  if (props.filter.length === 0) {
    return (
      <AppEmptyState
        title="No slides"
        description="Use New Slide above to add ranking, Q&A, word cloud, or multiple choice."
      />
    );
  }

  const slide = props.filter[props.indexFilterShow];
  if (!slide) {
    return <AppEmptyState title="Select a slide" description="Choose a slide from the list to edit its content." />;
  }

  const shared = {
    indexFilterShow: props.indexFilterShow,
    filter: props.filter,
    setFilter: props.setFilter,
    deteleFilter: props.deteleFilter,
  };

  switch (slide.featuresWork) {
    case 'rank':
      return <Ranking {...shared} />;
    case 'open':
      return <QA {...shared} />;
    case 'word':
      return <WordCloud {...shared} />;
    case 'multiple':
      return <Multi {...shared} />;
    case 'QRcode':
      return <QR {...shared} />;
    default:
      return (
        <AppEmptyState
          title="Unknown slide type"
          description={`Slide type "${slide.featuresWork}" is not supported.`}
        />
      );
  }
};

export default Content;
