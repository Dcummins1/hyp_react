import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';
import { firebaseConfig } from "../config"

const config = firebaseConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};