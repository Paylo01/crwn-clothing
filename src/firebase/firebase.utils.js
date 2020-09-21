import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBaEIRalwzIGkUzKNoGAOjBPf1c5eX6X1Q",
    authDomain: "crwn-db-b5d03.firebaseapp.com",
    databaseURL: "https://crwn-db-b5d03.firebaseio.com",
    projectId: "crwn-db-b5d03",
    storageBucket: "crwn-db-b5d03.appspot.com",
    messagingSenderId: "239044865122",
    appId: "1:239044865122:web:a4a13d1a32c06d9fc8f53b",
    measurementId: "G-9316GTMF0W"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;