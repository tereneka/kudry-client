import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
} from 'firebase/firestore';
import { getStorage, ref, listAll } from "firebase/storage";
import { categores, masters, services, subCategores } from './initialDbData';

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
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const storageRef = ref(storage, 'works');

// listAll(storageRef).then(res => {
//   res.items.forEach(i => console.log(i.fullPath))
// })

let index: number = 10;
function add() {
  if (index < services.length) {
    addDoc(collection(db, 'services'), services[index])
      .then(() => {
        index += 1
        add()
      })
  }
}
// add()
// getDocs(collection(db, 'categores')).then(docs => docs.forEach(doc => console.log(doc.id, doc.data())))

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
function createRoot(container: HTMLElement) {
  throw new Error('Function not implemented.');
}

