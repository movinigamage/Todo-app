import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAHeIAnRXwfw9tfn9FzFuIUzAmXLUU3ubs",
    authDomain: "todo-app-b67f0.firebaseapp.com",
    projectId: "todo-app-b67f0",
    storageBucket: "todo-app-b67f0.appspot.com",
    messagingSenderId: "1090809976540",
    appId: "1:1090809976540:web:b6abf583427fca7a930619",
    measurementId: "G-DSZEE50NN8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, updateProfile, db, doc, setDoc, getDocs, collection };