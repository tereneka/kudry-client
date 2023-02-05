import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/main/Main";
import OnlineReg from "../pages/online-reg/OnlineReg";

function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="*" element={<Main />} />
      </Route>
      <Route path="/online-reg" element={<OnlineReg />}>
        <Route path="*" element={<OnlineReg />} />
      </Route>
    </Routes>
  );
}

export default RouterApp;


