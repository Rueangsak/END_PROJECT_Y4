import { db, auth } from './firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const addFormToDB = (uid, nameWork, onSuccess, onError) => {
  addDoc(collection(db, 'Form'), {
    uid,
    nameWork,
    filter: [],
  })
    .then(() => {
      onSuccess?.();
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      onError?.(error);
    });
};

const getForm = (success, onError) => {
  const formQuery = query(collection(db, 'Form'), where('uid', '==', auth.currentUser.uid));
  return onSnapshot(
    formQuery,
    (querySnapshot) => {
      const forms = [];
      querySnapshot.forEach((snap) => {
        forms.push({ ...snap.data(), id: snap.id });
      });
      success(forms);
    },
    (error) => {
      console.error('Error loading forms: ', error);
      onError?.(error);
    }
  );
};

const getPaper = (docid, getSuccess, getError) => {
  const docRef = doc(db, 'Form', docid);
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        getSuccess(docSnap.data());
      } else {
        const err = new Error('Presentation not found');
        getError?.(err);
      }
    })
    .catch((error) => {
      console.error('Error getting document:', error);
      getError?.(error);
    });
};

const updatePaper = (docid, filter, saveSuccess, saveError) => {
  updateDoc(doc(db, 'Form', docid), { filter })
    .then(() => {
      saveSuccess?.();
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
      saveError?.(error);
    });
};

export default { addFormToDB, getForm, getPaper, updatePaper };
