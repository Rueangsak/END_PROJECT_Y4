import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Real-time aggregate of answers for a presentation session.
 */
export default function useLiveAnswers(docId) {
  const [answerUser, setAnswerUser] = useState([]);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!docId) return undefined;
    setReady(false);
    setError(null);
    const docRef = doc(db, 'Form', docId);
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
        setAnswerUser(x);
        setReady(true);
      },
      (err) => {
        console.error('Live answers subscription failed:', err);
        setError('Could not load live responses.');
        setReady(true);
      }
    );
    return unsub;
  }, [docId]);

  return { answerUser, error, ready };
}

/** Answers for one slide index */
export function answersForSlide(answerUser, slideIndex) {
  return answerUser.filter((a) => Number(a.index) === Number(slideIndex));
}

/** Vote counts keyed by answer text */
export function voteCountsForSlide(answerUser, slideIndex) {
  const counts = new Map();
  answersForSlide(answerUser, slideIndex).forEach((a) => {
    counts.set(a.answer, (counts.get(a.answer) || 0) + (a.count || 1));
  });
  return [...counts.entries()].map(([answer, count]) => ({ answer, count }));
}
