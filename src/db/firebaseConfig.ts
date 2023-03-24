import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA6pW53wJLEcxCovwvqzgbQtCn1gzZuGcM",
    authDomain: "kudry-e905c.firebaseapp.com",
    projectId: "kudry-e905c",
    storageBucket: "kudry-e905c.appspot.com",
    messagingSenderId: "869626329614",
    appId: "1:869626329614:web:59eaa85182391bf64a1a5f",
    measurementId: "G-8R2L321C50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);