import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../features/main-page/page/MainPage";
import RegPage from "../features/reg-page/page/RegPage";
import DateForm from "../features/reg-page/registration/DateForm";
import MastersForm from "../features/reg-page/registration/MastersForm";
import ServicesForm from "../features/reg-page/registration/ServicesForm";
import UserInfoForm from "../features/reg-page/registration/UserInfoForm";

function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="*" element={<MainPage />} />
      </Route>
      <Route
        path="/online-reg"
        element={<RegPage />}>
        <Route
          path="contacts"
          element={<UserInfoForm />}
        />
        <Route
          path="services"
          element={<ServicesForm />}
        />
        <Route
          path="masters"
          element={<MastersForm />}
        />
        <Route
          path="date"
          element={<DateForm />}
        />
        <Route path="*" element={<RegPage />} />
      </Route>
    </Routes>
  );
}

export default RouterApp;
