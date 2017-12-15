import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBx7pmyDDwawmhKqDz47aW1NNBUmuohs6U",
    authDomain: "wudeckhelper.firebaseapp.com",
    databaseURL: "https://wudeckhelper.firebaseio.com",
    projectId: "wudeckhelper",
    storageBucket: "",
    messagingSenderId: "861063571439"
  };
  
firebase.initializeApp(config);

export const auth = firebase.auth();

export const dbref = path => firebase.database().ref(path);

export default firebase;
