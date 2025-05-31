import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB9Oqilt72bXyt7iaGT9Y07C0_yasMe1vs",
  authDomain: "sendeva-633cd.firebaseapp.com",
  projectId: "sendeva-633cd",
  storageBucket: "sendeva-633cd.firebasestorage.app",
  messagingSenderId: "1065391601456",
  appId: "1:1065391601456:web:c19f753fdc0622cf29faf5",
  measurementId: "G-BTQDG2F96H"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BP7Un0_uvooFDwMDj1DMPNNnoJyzNRoMxqUIkfjOC-sDkv0Wn4MjNvS9_AL_6NS36pYHw2eI9BBIItIFiXr4-FM",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
