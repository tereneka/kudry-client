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
  orderBy,
  query,
} from 'firebase/firestore';
import { getStorage, ref, listAll } from "firebase/storage";
import { categores, masters, services, subCategores } from './initialDbData';
import { Provider } from 'react-redux';
import { store } from './store';
import { db, storage } from './db/firebaseConfig';

// const storageRef = ref(storage, 'works');

// listAll(storageRef).then(res => {
//   res.items.forEach(i => console.log(i.fullPath))
// })

// let index: number = 10;
// function add() {
//   if (index < services.length) {
//     addDoc(collection(db, 'services'), services[index])
//       .then(() => {
//         index += 1
//         add()
//       })
//   }
// }
// add()
// getDocs(collection(db, 'categores')).then(docs => docs.forEach(doc => console.log(doc.id, doc.data())))


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
function createRoot(container: HTMLElement) {
  throw new Error('Function not implemented.');
}

