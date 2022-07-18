import firebase from "../node_modules/firebase/compat";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAnwOvdjYOTmXEfaZs4Vcj3i33pzaZR61M",
  authDomain: "todo-app-with-bootstrap.firebaseapp.com",
  projectId: "todo-app-with-bootstrap",
  storageBucket: "todo-app-with-bootstrap.appspot.com",
  messagingSenderId: "822431672755",
  appId: "1:822431672755:web:5c0030be1d8a89609b43c6",
  measurementId: "G-EYTSJ9T38J"
});

const db = firebaseApp.firestore();

export default db;
