import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyB7Sgr9zdFLIgWzkgBMVfUgNInuOSul18Q",
  authDomain: "jak-tinder-clone-fed6e.firebaseapp.com",
  projectId: "jak-tinder-clone-fed6e",
  storageBucket: "jak-tinder-clone-fed6e.appspot.com",
  messagingSenderId: "711999260379",
  appId: "1:711999260379:web:9baaf2c26be7ae52d06efe",
};

const app = initializeApp(config);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
