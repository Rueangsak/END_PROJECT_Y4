import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppErrorState } from '../design-system';
import Paperpre from '../c-presen/paperpre';
import BigpaperShow from '../c-presen/bigpaperShow';
import serviceApi from '../firebase/serviceApi';
import useLiveAnswers from '../hooks/useLiveAnswers';
import { PageLoading, PresenterShell, PresenterToolbar } from '../layout';

const Show = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [sessionTitle, setSessionTitle] = useState('Live results');
  const [filter, setFilter] = useState([]);
  const [indexFilterShow, setIndexFilterShow] = useState(0);
  const { answerUser, error: liveError } = useLiveAnswers(docId);

  useEffect(() => {
    setLoading(true);
    setFetchError(null);
    serviceApi.getPaper(
      docId,
      (workdata) => {
        setFilter(workdata.filter ?? []);
        setSessionTitle(workdata.nameWork ? `${workdata.nameWork} — Live` : 'Live results');
        setLoading(false);
      },
      () => {
        setFetchError('Could not load live view for this session.');
        setLoading(false);
      }
    );
  }, [docId]);

  if (loading) {
    return <PageLoading message="Loading live view..." />;
  }

  if (fetchError || liveError) {
    return (
      <AppErrorState
        title="Live view unavailable"
        message={fetchError || liveError}
        onRetry={() => navigate(`/Open/${docId}`)}
        retryLabel="Back to editor"
      />
    );
  }

  return (
    <PresenterShell
      showPanel={false}
      toolbar={
        <PresenterToolbar
          title={sessionTitle}
          actions={[
            {
              label: 'Back to editor',
              variant: 'outlined',
              onClick: () => navigate(`/Open/${docId}`),
            },
          ]}
        />
      }
      sidebar={
        <Paperpre filter={filter} indexFilterShow={indexFilterShow} setIndexFilterShow={setIndexFilterShow} />
      }
      main={
        <BigpaperShow indexFilterShow={indexFilterShow} filter={filter} answerUser={answerUser} />
      }
    />
  );
};

export default Show;
