importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyB9Oqilt72bXyt7iaGT9Y07C0_yasMe1vs",
  authDomain: "sendeva-633cd.firebaseapp.com",
  projectId: "sendeva-633cd",
  storageBucket: "sendeva-633cd.firebasestorage.app",
  messagingSenderId: "1065391601456",
  appId: "1:1065391601456:web:c19f753fdc0622cf29faf5",
  measurementId: "G-BTQDG2F96H"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
