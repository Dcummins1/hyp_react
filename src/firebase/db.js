import { db, firestore } from './firebase';
import firebase from 'firebase/app';


// User API

export const doCreateUser = (id, username, email, roles) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    roles,
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

export const addDocument = (collectionName, data) => {
  return firestore.collection(collectionName).add(data);
}


//Make immutable?
export const addEvent = (eventData) => {
  const colRef = firestore.collection("events");
  eventData.coordinate = new firebase.firestore.GeoPoint(eventData.coordinate.lat, eventData.coordinate.lng);
  eventData.location = JSON.stringify(eventData.location);
  return colRef.add(eventData).then(() => {
    console.log("event added");
  });
}

// Other Entity APIs ...