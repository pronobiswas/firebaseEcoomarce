// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_mMjOXCr6v5fPzhI6PLKPyUDxnz_g5VY",
  authDomain: "varaghar121.firebaseapp.com",
  projectId: "varaghar121",
  storageBucket: "varaghar121.appspot.com",
  messagingSenderId: "915326723380",
  appId: "1:915326723380:web:1c84b8b43f7f0b1565f161",
  measurementId: "G-BYC7QEN6X5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
const messaging = getMessaging(app);