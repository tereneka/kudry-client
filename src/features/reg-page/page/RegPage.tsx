import React, { createRef } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  SwitchTransition,
  CSSTransition,
} from "react-transition-group";
import { regPageRouteList } from "../../../constants";
import Header from "../header/Header";
import "./reg.css";

export default function RegPage() {
  const location = useLocation();

  const navigate = useNavigate();

  const nodeRef = createRef<HTMLDivElement>();

  window.addEventListener("load", () => {
    navigate(regPageRouteList[0]);
  });

  return (
    <>
      <Header />
      <main>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={400}
            classNames="reg-page"
            unmountOnExit>
            <div
              ref={nodeRef}
              className="reg-page">
              <Outlet />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </main>
    </>
  );
}
