// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDSgl8BqRe9HPcfcmCcterVOuK4ckY1Ihc",
    authDomain: "task-list-7bb3b.firebaseapp.com",
    projectId: "task-list-7bb3b",
    storageBucket: "task-list-7bb3b.appspot.com",
    messagingSenderId: "439576102041",
    appId: "1:439576102041:web:596a1f4b8bc1cdc21ca408"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
