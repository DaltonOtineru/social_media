import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'social-media-fd7fd.firebaseapp.com',
  projectId: 'social-media-fd7fd',
  storageBucket: 'social-media-fd7fd.appspot.com',
  messagingSenderId: '885766955304',
  appId: '1:885766955304:web:cdab814fcc1eb74768f01d',
  measurementId: 'G-HHHMGE82Y4',
};

// app initialization
const app = firebase.initializeApp(firebaseConfig);

// database, auth & storage initializations
const db = app.firestore();
const auth = firebase.auth();
const storage = getStorage();

export default app;
export { auth, db, storage };
