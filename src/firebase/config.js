import app from "firebase/app"
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyAgQhX3B_bqddpLN-DQsG00wAaPBjyA3xU",
    authDomain: "finalkochrendo.firebaseapp.com",
    projectId: "finalkochrendo",
    storageBucket: "finalkochrendo.appspot.com",
    messagingSenderId: "677008161688",
    appId: "1:677008161688:web:d97090970174b3509349ed"
  };  
app.initializeApp(firebaseConfig);

export const auth= firebase.auth()
export const storage= app.storage()
export const db= app.firestore()