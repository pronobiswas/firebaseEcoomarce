// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB_mMjOXCr6v5fPzhI6PLKPyUDxnz_g5VY",
  authDomain: "varaghar121.firebaseapp.com",
  projectId: "varaghar121",
  storageBucket: "varaghar121.appspot.com",
  messagingSenderId: "915326723380",
  appId: "1:915326723380:web:1c84b8b43f7f0b1565f161",
  measurementId: "G-BYC7QEN6X5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig; 
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const requestPermission = await Notification.requestPermission();
  console.log(requestPermission);

  if(requestPermission === "granted"){
    const token = await getToken(messaging, {
      vapidKey: "BHB6pCqcka-XsTl9b19ZXz3Ofdd2PXWVqPG0UeDpA34Twx70Aqg2dFzHAB4rlLE4tRJ5W5fo6yXyB9i2-y0E2g0"
    })
    console.log(token);
    
  }
};
