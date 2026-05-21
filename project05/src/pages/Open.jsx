import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useNavigate, useParams } from 'react-router-dom';
import { AppButton, AppModal, AppSection, AppErrorState, useAppFeedback } from '../design-system';
import QRCode from 'qrcode';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import Newslide from '../c-presen/newslide';
import Paperpre from '../c-presen/paperpre';
import Bigpaper from '../c-presen/bigpaper';
import Content from '../c-presen/content';
import { db } from '../firebase/firebase';
import serviceApi from '../firebase/serviceApi';
import { PageLoading, PresenterShell, PresenterToolbar, QrPanel } from '../layout';

import { participantJoinUrl } from '../config/urls';
import useLiveAnswers from '../hooks/useLiveAnswers';

const Open = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { notifySuccess, notifyError, confirm } = useAppFeedback();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [sessionTitle, setSessionTitle] = useState('');
  const [filter, setFilter] = useState([]);
  const [indexFilterShow, setIndexFilterShow] = useState(0);
  const [qrOpen, setQrOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [clearing, setClearing] = useState(false);
  const { answerUser, error: liveError } = useLiveAnswers(docId);

  const addfilter = (newfilter) => setFilter([...filter, newfilter]);
  const deteleFilter = (oldIndex) => setFilter(filter.filter((_, index) => index !== oldIndex));

  const save = () => {
    setSaving(true);
    serviceApi.updatePaper(
      docId,
      filter,
      () => {
        setSaving(false);
        notifySuccess('Presentation saved');
      },
      () => {
        setSaving(false);
        notifyError('Could not save. Please try again.');
      }
    );
  };

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
        setFetchError('This presentation could not be loaded. It may have been deleted.');
        setLoading(false);
      }
    );
  }, [docId]);

  const handleDeleteCollection = async () => {
    const ok = await confirm({
      title: 'Clear all responses?',
      message: 'This permanently removes every participant answer for this session.',
      confirmLabel: 'Clear responses',
      cancelLabel: 'Cancel',
      destructive: true,
    });
    if (!ok) return;

    setClearing(true);
    try {
      const querySnapshot = await getDocs(collection(doc(db, 'Form', docId), 'answers'));
      await Promise.all(querySnapshot.docs.map((d) => deleteDoc(d.ref)));
      notifySuccess('All responses cleared');
    } catch (error) {
      console.error('Error deleting collection: ', error);
      notifyError('Could not clear responses. Please try again.');
    } finally {
      setClearing(false);
    }
  };

  const generateQrCode = async () => {
    setQrLoading(true);
    setQrError(false);
    try {
      const response = await QRCode.toDataURL(participantJoinUrl(docId));
      setImageUrl(response);
    } catch (error) {
      console.error(error);
      setImageUrl('');
      setQrError(true);
      notifyError('Could not generate QR code');
    } finally {
      setQrLoading(false);
    }
  };

  const handleQrOpen = () => {
    setQrOpen(true);
    setImageUrl('');
    generateQrCode();
  };

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

  const participantUrl = participantJoinUrl(docId);

  return (
    <>
      <PresenterShell
        toolbar={
          <PresenterToolbar
            title={sessionTitle}
            actions={[
              { label: saving ? 'Saving…' : 'Save', onClick: save, disabled: saving },
              {
                label: 'Live results',
                onClick: () => navigate(`/Show/${docId}`),
                variant: 'outlined',
              },
              { label: 'Share QR', onClick: handleQrOpen, variant: 'outlined' },
            ]}
          />
        }
        newSlide={<Newslide addfilter={addfilter} />}
        sidebar={
          <Paperpre filter={filter} indexFilterShow={indexFilterShow} setIndexFilterShow={setIndexFilterShow} />
        }
        main={<Bigpaper indexFilterShow={indexFilterShow} filter={filter} answerUser={answerUser} />}
        panel={
          <AppSection title="Slide settings" subtitle="Edit the active slide and session data.">
            <Content
              indexFilterShow={indexFilterShow}
              filter={filter}
              setFilter={setFilter}
              deteleFilter={deteleFilter}
            />
            <Stack spacing={1.5} sx={{ pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <AppButton
                variant="outlined"
                color="error"
                fullWidth
                loading={clearing}
                disabled={clearing}
                onClick={handleDeleteCollection}
              >
                Clear all responses
              </AppButton>
            </Stack>
          </AppSection>
        }
      />

      <AppModal open={qrOpen} onClose={() => setQrOpen(false)} title="Share with participants" maxWidth="xs">
        <QrPanel
          imageUrl={imageUrl}
          loading={qrLoading}
          error={qrError}
          onRetry={generateQrCode}
          caption="Scan to join this session on a phone or tablet."
          participantUrl={participantUrl}
        />
      </AppModal>
    </>
  );
};

export default Open;
