import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppErrorState } from '../design-system';
import serviceApi from '../firebase/serviceApi';
import useLiveAnswers from '../hooks/useLiveAnswers';
import LiveSlideContent from '../c-presen/LiveSlideContent';
import { PageLoading, PresenterShell, SlideCanvas } from '../layout';

/**
 * Standalone live view for a single slide index (legacy share routes).
 */
export default function ShowSlidePage({ expectedType }) {
  const { docId, index } = useParams();
  const slideIndex = Number(index);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [filter, setFilter] = useState([]);
  const { answerUser, error: liveError } = useLiveAnswers(docId);

  useEffect(() => {
    serviceApi.getPaper(
      docId,
      (data) => {
        setFilter(data.filter ?? []);
        setLoading(false);
      },
      () => {
        setFetchError('Session not found.');
        setLoading(false);
      }
    );
  }, [docId]);

  if (loading) return <PageLoading message="Loading live view..." fullScreen />;

  if (fetchError || liveError) {
    return (
      <AppErrorState
        title="Unavailable"
        message={fetchError || liveError}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const slide = filter[slideIndex];
  if (!slide) {
    return (
      <PresenterShell showPanel={false} main={<SlideCanvas emptyMessage="Slide not found" />} />
    );
  }

  if (expectedType && slide.featuresWork !== expectedType) {
    return (
      <PresenterShell
        showPanel={false}
        main={
          <SlideCanvas
            emptyMessage={`This route is for "${expectedType}" slides. This slide is "${slide.featuresWork}".`}
          />
        }
      />
    );
  }

  return (
    <PresenterShell
      showPanel={false}
      main={
        <SlideCanvas title={slide.question} subtitle={`Slide ${slideIndex + 1}`}>
          <LiveSlideContent slide={slide} indexFilterShow={slideIndex} answerUser={answerUser} />
        </SlideCanvas>
      }
    />
  );
}
