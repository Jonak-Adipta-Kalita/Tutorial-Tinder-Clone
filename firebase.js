import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyB7Sgr9zdFLIgWzkgBMVfUgNInuOSul18Q",
  authDomain: "jak-tinder-clone-fed6e.firebaseapp.com",
  projectId: "jak-tinder-clone-fed6e",
  storageBucket: "jak-tinder-clone-fed6e.appspot.com",
  messagingSenderId: "711999260379",
  appId: "1:711999260379:web:9baaf2c26be7ae52d06efe",
};

const app = !getApps().length ? initializeApp(config) : getApp();
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { app, auth, db, storage };
