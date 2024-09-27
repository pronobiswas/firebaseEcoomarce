import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";
 
const firebaseApp = initializeApp({
    apiKey: "AIzaSyB_mMjOXCr6v5fPzhI6PLKPyUDxnz_g5VY",
    authDomain: "varaghar121.firebaseapp.com",
    projectId: "varaghar121",
    storageBucket: "varaghar121.appspot.com",
    messagingSenderId: "915326723380",
    appId: "1:915326723380:web:1c84b8b43f7f0b1565f161",
    measurementId: "G-BYC7QEN6X5",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);


onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});