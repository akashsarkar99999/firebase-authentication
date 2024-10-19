// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr36Db8nlpNl8MDd5aRWfhYtePfP94irg",
  authDomain: "user-authentication-52aab.firebaseapp.com",
  projectId: "user-authentication-52aab",
  storageBucket: "user-authentication-52aab.appspot.com",
  messagingSenderId: "362148020131",
  appId: "1:362148020131:web:442b2fbb5bdfffaf3d6416"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;