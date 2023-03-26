import React, { useEffect } from "react";
import RouterApp from "./features/router/RouterApp";
import Header from "./features/header/Header";
import { useLocation } from "react-router-dom";

export default function App() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetElement =
        document.getElementById(
          hash.substring(1)
        );
      targetElement?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [hash, key]);

  return (
    <>
      <Header />
      <RouterApp />
    </>
  );
}
