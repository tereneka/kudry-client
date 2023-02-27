import React from "react";
import Logo from "../../../components/Logo";
import Header from "../header/Header";
import RegForm from "../registration/RegForm";
import "./reg.css";

export default function RegPage() {
  return (
    <>
      <Header />
      <main>
        <RegForm />
      </main>
    </>
  );
}
