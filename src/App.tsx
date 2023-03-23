import React, { createRef } from "react";
import Header from "./features/header/Header";
import RouterApp from "./router/RouterApp";
import {
  SwitchTransition,
  CSSTransition,
} from "react-transition-group";
import { useLocation } from "react-router-dom";
import { registrationRoutes } from "./router/routes";
import Footer from "./features/main-page/footer/Footer";

export default function App() {
  const location = useLocation().pathname;
  // const nodeRef = createRef<HTMLDivElement>();
  const { nodeRef } =
    registrationRoutes.find(
      (route) => route.path === location
    ) ?? {};

  return (
    <>
      <Header />

      <main>
        <RouterApp />
        {/* <SwitchTransition>
          <CSSTransition
            key={location}
            nodeRef={nodeRef}
            timeout={300}
            classNames="page"
            unmountOnExit>
            {() => (
              <div ref={nodeRef} className="page">
                <RouterApp />
              </div>
            )}
          </CSSTransition>
        </SwitchTransition> */}
      </main>

      <Footer />
    </>
  );
}
