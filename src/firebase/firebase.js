import firebase from "firebase/compat/app";
import 'firebase/compat/database';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBukzP0PsdEoCiN-_s2lLP3XLqQ7jA2-ok",
    authDomain: "us-stock-f80e1.firebaseapp.com",
    projectId: "us-stock-f80e1",
    storageBucket: "us-stock-f80e1.appspot.com",
    messagingSenderId: "857798623381",
    appId: "1:857798623381:web:7b0762401a4cf5c8ef5b9c"
});

const db = firebaseConfig.database().ref();
export default db;