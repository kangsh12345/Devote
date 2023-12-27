// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export let app: FirebaseApp;

const firebaseConfig = {
  apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  ),
  appId: String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
};

try {
  app = getApp('app');
} catch (e) {
  app = initializeApp(firebaseConfig, 'app');
}

export const storage = getStorage(app);

export default app;
