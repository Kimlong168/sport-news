// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs5t5LYIzcvZdJQ9hw-IKxSx1cdwZ5ISI",
  authDomain: "blogproject-94585.firebaseapp.com",
  projectId: "blogproject-94585",
  storageBucket: "blogproject-94585.appspot.com",
  messagingSenderId: "745422127922",
  appId: "1:745422127922:web:b9d2adc538aaf204f64d2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();