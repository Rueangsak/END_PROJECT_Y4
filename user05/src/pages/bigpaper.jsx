import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { SlideCanvas } from '../layout';
import LiveSlideContent from '../c-presen/LiveSlideContent';

const Bigpaper = (props) => {
  const { docId } = useParams();
  const [answerUser, setanswerUser] = useState([]);
  const docRef = doc(db, 'Form', docId);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(docRef, 'answers'),
      (querySnapshot) => {
        const x = [];
        querySnapshot.forEach((snap) => {
          const data = snap.data();
          const y = x.findIndex((item) => item.answer === data.answer && item.index === data.index);
          if (y === -1) {
            x.push({
              user: data.user,
              answer: data.answer,
              count: 1,
              index: data.index,
              status: data.status,
            });
          } else {
            x[y].count += 1;
          }
        });
        setanswerUser(x);
      },
      (error) => console.error('Error getting documents: ', error)
    );
    return unsub;
  }, [docId]);

  if (!props.filter?.length) {
    return <SlideCanvas emptyMessage="No slides in this session yet" />;
  }

  const slide = props.filter[props.indexFilterShow];
  if (!slide) {
    return <SlideCanvas emptyMessage="Select a slide" />;
  }

  const labels = {
    rank: 'Ranking',
    open: 'Open-ended',
    word: 'Word cloud',
    multiple: 'Multiple choice',
    QRcode: 'QR',
  };
  const label = labels[slide.featuresWork] || slide.featuresWork;

  return (
    <SlideCanvas title={`${label} · ${props.indexFilterShow + 1}`} subtitle={slide.question}>
      <LiveSlideContent slide={slide} indexFilterShow={props.indexFilterShow} answerUser={answerUser} />
    </SlideCanvas>
  );
};

export default Bigpaper;
