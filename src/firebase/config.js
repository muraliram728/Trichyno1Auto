import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBroiimZtg68L3n76qa5wCVqzQfC_1-zm4",
  authDomain: "trichy-no-1-auto.firebaseapp.com",
  projectId: "trichy-no-1-auto",
  storageBucket: "trichy-no-1-auto.firebasestorage.app",
  messagingSenderId: "407767508420",
  appId: "1:407767508420:web:caae14037722087592f091",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
