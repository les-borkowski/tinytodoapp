import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth'



// firebase

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
})



const auth = firebase.auth();
const db = firebase.firestore();
const provider = new GoogleAuthProvider();

export default firebase;
export { auth, db, provider, firebase }