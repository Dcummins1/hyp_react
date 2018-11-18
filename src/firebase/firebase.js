import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBVm02CIkmU0C6LUZlU6jWokIyEG8_G_Pw",
    authDomain: "hypbackend.firebaseapp.com",
    databaseURL: "https://hypbackend.firebaseio.com",
    projectId: "hypbackend",
    storageBucket: "hypbackend.appspot.com",
    messagingSenderId: "463060733623",
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};