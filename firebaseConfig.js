//파이어베이스 설정
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { keys } from "./key/ApiKey";

const firebaseConfig = {
  apiKey: keys.firebaseKey,
  authDomain: "webtoon-dabom.firebaseapp.com",
  projectId: "webtoon-dabom",
  storageBucket: "webtoon-dabom.appspot.com",
  messagingSenderId: "523821173516",
  appId: "1:523821173516:web:4ca13213705ecb3f219729",
  measurementId: "G-LPLQP4TD2P"
};

// 파이어베이스 초기화
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
