import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../main-page/MainPage';
import RegPage from '../reg-page/RegPage';
import { registrationRoutes } from './routes';

function RouterApp() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}>
        <Route path='*' element={<MainPage />} />
      </Route>
      {/* онлайн регистрация */}
      {/* <Route
        path='/online-reg'
        element={<RegPage />}>
        {registrationRoutes.map((route) => (
          <Route
            path={route.path}
            element={route.element}
            key={route.path}
          />
        ))}
        <Route path='*' element={<RegPage />} />
      </Route> */}
    </Routes>
  );
}

export default RouterApp;
