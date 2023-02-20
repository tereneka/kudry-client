import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../features/main-page/page/MainPage";
import OnlineReg from "../features/online-reg-page/OnlineReg";

function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="*" element={<MainPage />} />
      </Route>
      <Route path="/online-reg" element={<OnlineReg />}>
        <Route path="*" element={<OnlineReg />} />
      </Route>
    </Routes>
  );
}

export default RouterApp;


