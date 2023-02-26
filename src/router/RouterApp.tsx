import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../features/main-page/page/MainPage";
import RegPage from "../features/reg-page/page/RegPage";

function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="*" element={<MainPage />} />
      </Route>
      <Route
        path="/online-reg"
        element={<RegPage />}>
        <Route path="*" element={<RegPage />} />
      </Route>
    </Routes>
  );
}

export default RouterApp;
