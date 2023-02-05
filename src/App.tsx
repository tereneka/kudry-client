import React from 'react';
import { useDownloadURL, useUploadFile } from 'react-firebase-hooks/storage';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '.';
import RouterApp from './router/RouterApp';
import { BrowserRouter } from 'react-router-dom';

function App() {
  // const [value, loading, error] = useDownloadURL(ref(storage, 'works/IMG-20221030-WA0004.jpg'));
  // console.log(value);
  // getDownloadURL(ref(storage, 'works/IMG-20221030-WA0004.jpg')).then(url => console.log(url))
  return (
    <>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </>
  );
}

export default App;
