import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppErrorState } from '../design-system';
import Paperpre from './paperpre';
import Bigpaper from './bigpaper';
import serviceApi from '../firebase/serviceApi';
import useLiveAnswers from '../hooks/useLiveAnswers';
import { PageLoading, PresenterShell, PresenterToolbar } from '../layout';

const Open = () => {
  const { docId } = useParams();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [sessionTitle, setSessionTitle] = useState('Presentation');
  const [filter, setFilter] = useState([]);
  const [indexFilterShow, setIndexFilterShow] = useState(0);
  const { error: liveError } = useLiveAnswers(docId);

  useEffect(() => {
    setLoading(true);
    setFetchError(null);
    serviceApi.getPaper(
      docId,
      (workdata) => {
        setFilter(workdata.filter ?? []);
        setSessionTitle(workdata.nameWork || 'Presentation');
        setLoading(false);
      },
      () => {
        setFetchError('Could not load this presentation.');
        setLoading(false);
      }
    );
  }, [docId]);

  if (loading) {
    return <PageLoading message="Loading presentation..." />;
  }

  if (fetchError || liveError) {
    return (
      <AppErrorState
        title="Presentation unavailable"
        message={fetchError || liveError}
        onRetry={() => window.location.reload()}
        retryLabel="Reload"
      />
    );
  }

  return (
    <PresenterShell
      toolbar={<PresenterToolbar title={sessionTitle} actions={[]} />}
      sidebar={
        <Paperpre filter={filter} indexFilterShow={indexFilterShow} setIndexFilterShow={setIndexFilterShow} />
      }
      main={<Bigpaper indexFilterShow={indexFilterShow} filter={filter} />}
      showPanel={false}
    />
  );
};

export default Open;
