import React, { useState, useEffect } from 'react';
import Multipleuser from '../Features/Multipleuser';
import Openenduser from '../Features/Openenduser';
import Rankinguser from '../Features/Rankinguser';
import Wordclouduser from '../Features/Wordclouduser';
import serviceApi from '../firebase/serviceApi';
import { useParams } from 'react-router-dom';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AppButton, AppCard, AppEmptyState, AppErrorState, AppInput, AppLoader } from '../design-system';
import { formMaxWidth } from '../design-system/tokens/spacing';
import { ParticipantLayout } from '../layout';
import { countParticipantSteps, participantStepIndex } from '../layout/participantProgress';

const User = () => {
  const { docId } = useParams();
  const [filter, setFilter] = useState([]);
  const [indexFilterShow, setIndexFilterShow] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [user, setUser] = useState('');
  const [checkUser, setCheckUser] = useState(false);
  const [userError, setUserError] = useState('');
  const docRef = doc(db, 'Form', docId);
  const [answerUser, setanswerUser] = useState([]);

  useEffect(() => {
    setLoading(true);
    setFetchError(null);
    serviceApi.getPaper(
      docId,
      (workdata) => {
        setFilter(workdata.filter ?? []);
        setLoading(false);
      },
      () => {
        setFetchError('This session is unavailable. Check the link or ask your instructor.');
        setLoading(false);
      }
    );
  }, [docId]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(docRef, 'answers'),
      (querySnapshot) => {
        const x = [];
        querySnapshot.forEach((d) => {
          const y = x.findIndex((data) => data.answer === d.data().answer);
          if (y === -1) {
            x.push({
              user: d.data().user,
              answer: d.data().answer,
              count: 1,
              index: d.data().index,
              status: d.data().status,
            });
          } else {
            x[y].count += 1;
          }
        });
        setanswerUser([...x]);
      },
      (error) => console.error('Error getting documents: ', error)
    );
    return unsub;
  }, [docId]);

  useEffect(() => {
    if (filter[indexFilterShow]?.featuresWork === 'QRcode') {
      setIndexFilterShow((i) => i + 1);
    }
  }, [indexFilterShow, filter]);

  const totalSteps = countParticipantSteps(filter);
  const step = participantStepIndex(filter, indexFilterShow);

  if (loading) {
    return <AppLoader message="Loading session..." fullScreen />;
  }

  if (fetchError) {
    return (
      <AppErrorState
        title="Session unavailable"
        message={fetchError}
        onRetry={() => window.location.reload()}
        retryLabel="Reload"
      />
    );
  }

  if (filter.length === 0) {
    return (
      <ParticipantLayout>
        <AppEmptyState title="Session not ready" description="This presentation has no slides yet." />
      </ParticipantLayout>
    );
  }

  if (!checkUser) {
    const handleSubmitUser = () => {
      if (!user.trim()) {
        setUserError('Please enter your name or student code.');
        return;
      }
      setUserError('');
      setCheckUser(true);
    };
    return (
      <ParticipantLayout>
        <AppCard
          title="Join session"
          subtitle="Enter your name or student code to participate."
          maxWidth={formMaxWidth.lg}
          padding="md"
        >
          <AppInput
            id="participant-id"
            label="Your ID"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            error={Boolean(userError)}
            helperText={userError}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSubmitUser())}
          />
          <AppButton variant="contained" onClick={handleSubmitUser} sx={{ mt: 2 }} fullWidth>
            Continue
          </AppButton>
        </AppCard>
      </ParticipantLayout>
    );
  }

  if (indexFilterShow === filter.length) {
    return (
      <ParticipantLayout>
        <AppCard title="Thank you" subtitle="Your responses have been recorded." padding="md" />
      </ParticipantLayout>
    );
  }

  const slide = filter[indexFilterShow];
  const shared = {
    data: slide,
    indexFilterShow,
    setIndexFilterShow,
    docId,
    user,
    answerUser,
    step,
    totalSlides: totalSteps,
  };

  if (slide.featuresWork === 'rank') {
    return <Rankinguser {...shared} />;
  }
  if (slide.featuresWork === 'open') {
    return <Openenduser {...shared} />;
  }
  if (slide.featuresWork === 'word') {
    return <Wordclouduser {...shared} />;
  }
  if (slide.featuresWork === 'multiple') {
    return <Multipleuser {...shared} />;
  }
  if (slide.featuresWork === 'QRcode') {
    return <AppLoader message="Loading next slide..." fullScreen />;
  }

  return (
    <ParticipantLayout>
      <AppEmptyState title="Unknown slide type" />
    </ParticipantLayout>
  );
};

export default User;
