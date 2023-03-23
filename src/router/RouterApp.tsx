import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../features/main-page/page/MainPage";
import RegPage from "../features/reg-page/page/RegPage";
import {
  mainRoutes,
  registrationRoutes,
} from "./routes";

function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        {mainRoutes.map((route) => (
          <Route
            path={route.path}
            element={route.element}
            key={route.path}
          />
        ))}
        <Route path="*" element={<MainPage />} />
      </Route>

      <Route
        path="/online-reg"
        element={<RegPage />}>
        {registrationRoutes.map((route) => (
          <Route
            path={route.path}
            element={route.element}
            key={route.path}
          />
        ))}
        <Route path="*" element={<RegPage />} />
      </Route>
    </Routes>
  );
}

export default RouterApp;
