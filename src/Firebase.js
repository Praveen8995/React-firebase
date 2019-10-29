import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDhs7l5fSNxdVr0hQhUhJFcV5b9R-CMZpY",
  authDomain: "pkassign-28520.firebaseapp.com",
  databaseURL: "https://pkassign-28520.firebaseio.com",
  projectId: "pkassign-28520",
  storageBucket: "pkassign-28520.appspot.com",
  messagingSenderId: "322986319341",
  appId: "1:322986319341:web:7fe21ec86cc3bd0f6c1be4",
  measurementId: "G-QSYVTCMYTK"
};
firebase.initializeApp(config);

// firebase.firestore().settings(settings);

export default firebase;