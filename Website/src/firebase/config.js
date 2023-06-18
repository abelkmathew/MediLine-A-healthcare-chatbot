// import firebase from 'firebase';
import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import  'firebase/auth'
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth"


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: YOUR_KEY_HERE,
    databaseURL: YOUR_KEY_HERE,
    projectId: YOUR_KEY_HERE,
    storageBucket: YOUR_KEY_HERE,
    messagingSenderId: YOUR_KEY_HERE,
    appId: YOUR_KEY_HERE,
    measurementId: YOUR_KEY_HERE
  };

const app= initializeApp(firebaseConfig)

export const db =getFirestore(app)

export default app;
