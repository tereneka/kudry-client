import React from "react";
import {
  Outlet,
  useNavigate,
} from "react-router-dom";
import { regPageRouteList } from "../../../constants";
import Header from "../header/Header";
import "./reg.css";

export default function RegPage() {
  const navigate = useNavigate();

  window.addEventListener("load", () => {
    navigate(regPageRouteList[0]);
  });

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
