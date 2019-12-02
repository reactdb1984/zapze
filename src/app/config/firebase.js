import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCEe1sjFBbRR4CTq4SKIaWCiITfSwybCls",
    authDomain: "test-9df15.firebaseapp.com",
    databaseURL: "https://test-9df15.firebaseio.com",
    projectId: "test-9df15",
    storageBucket: "test-9df15.appspot.com",
    messagingSenderId: "714477333568",
    appId: "1:714477333568:web:26847c55842073c04803a5",
    measurementId: "G-5WXD3VG6GE"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;