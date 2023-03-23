import React from "react";
import { Route, Routes } from "react-router-dom";
import Logo from "../../components/Logo";
import Menu from "./Menu";

export default function Header() {
  const regTitle = (
    <h2 className="header__title">
      online-запись
    </h2>
  );

  return (
    <>
      <header className="header" id="header">
        <Logo />

        <Routes>
          <Route path="/" element={<Menu />} />
          <Route
            path="/online-reg"
            element={regTitle}
          />
          <Route
            path="/online-reg/:n"
            element={regTitle}
          />
        </Routes>
      </header>
    </>
  );
}
