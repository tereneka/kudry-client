import React from "react";
import RouterApp from "./router/RouterApp";
import { BrowserRouter } from "react-router-dom";
import Header from "./features/header/Header";

export default function App() {
  return (
    <>
      <Header />
      <RouterApp />
    </>
  );
}
