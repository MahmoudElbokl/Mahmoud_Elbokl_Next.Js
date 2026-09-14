import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCSsqPptWS5alZpb8nIwI-Hi1oCYj9pIT0",
  authDomain: "portfolio-451e2.firebaseapp.com",
  projectId: "portfolio-451e2",
  storageBucket: "portfolio-451e2.appspot.com",
  messagingSenderId: "641307324749",
  appId: "1:641307324749:web:a426c8acf81abefa24c704",
  measurementId: "G-GZL0NDRK22",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const getFirebaseAnalytics = async () => {
  if (typeof window === "undefined") return null;
  const supported = await isSupported();
  if (!supported) return null;
  return getAnalytics(app);
};

export default app;
