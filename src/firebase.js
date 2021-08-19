import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAfX07sVsL6iMy4BL1OjYCz8tKljwre8yw",
  authDomain: "online-medical-consultat-5970a.firebaseapp.com",
  projectId: "online-medical-consultat-5970a",
  storageBucket: "online-medical-consultat-5970a.appspot.com",
  messagingSenderId: "116645111116",
  appId: "1:116645111116:web:4f8287ecc5e26829b8dbe9",
  measurementId: "G-8CFKNPJP3T"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.database();
const storage = firebase.storage();
export { auth, provider, storage };
export default db;
