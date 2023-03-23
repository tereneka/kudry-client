import React from "react";
import RouterApp from "./router/RouterApp";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </>
  );
}
