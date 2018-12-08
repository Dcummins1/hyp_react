import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from "../config";

const config = firebaseConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

export {
    db,
    auth,
    firestore,
    storage
};