import { firebase } from "@react-native-firebase/database";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfDje9MlaelXM3q38iuDuJaKchX5J5G3s",
  authDomain: "gaga-4848.firebaseapp.com",
  projectId: "gaga-4848",
  storageBucket: "gaga-4848.appspot.com",
  messagingSenderId: "262691462979",
  appId: "1:262691462979:web:f92bc5c25d069c4027d9f6",
  measurementId: "G-ZFZW3WS1X7",
  databaseURL: 'https://gaga-4848-default-rtdb.asia-southeast1.firebasedatabase.app'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// if(!firebase.app.length){
//     firebase.initializeApp(firebaseConfig)
// }


export {app}