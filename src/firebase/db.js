import { db, firestore } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    role : 'user',
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const getCollection = (collectionName) => {
  return new Promise((resolve) => {
    const colRef = firestore.collection(collectionName);
    colRef.get().then((col) => {
      const dataProms = [];
      const data = [];
      for (const doc in col.docs) {
        dataProms.push(col.docs[doc].ref.get().then((docData) => {
          data.push(docData.data());
        }));
      }
      Promise.all(dataProms).then(() => {
        resolve(data)
      });
    });
  });
  
}


// Other Entity APIs ...