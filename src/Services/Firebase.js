import firebase from "firebase/compat/app"
import "firebase/compat/auth"


// TODO: Make a better method to store API information!!!
const app = firebase.initializeApp({
    apiKey: "AIzaSyDa3ux0HA7YP9hSvtsRgDe_ts5RZFvN08o",
    authDomain: "crud-app-24523.firebaseapp.com",
    projectId: "crud-app-24523",
    storageBucket: "crud-app-24523.appspot.com",
    messagingSenderId: "103318477495",
    appId: "1:103318477495:web:dc5cbe381b5263eb21cb32",
    measurementId: "G-SN05LEMRF4"
});


// Initialize Firebase
export const auth = app.auth();
export default app;