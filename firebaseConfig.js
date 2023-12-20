import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDe3ULxaI5sl3xEWCNRa7109TFGBjDjwLc",
  authDomain: "webtoon-dabom.firebaseapp.com",
  projectId: "webtoon-dabom",
  storageBucket: "webtoon-dabom.appspot.com",
  messagingSenderId: "523821173516",
  appId: "1:523821173516:web:4ca13213705ecb3f219729",
  measurementId: "G-LPLQP4TD2P"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const fireStoreDB = getFirestore(app);
export const storage = getStorage(app);

export default app;