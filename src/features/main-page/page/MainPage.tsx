import Footer from "../footer/Footer";
import {
  useLocation,
  useOutlet,
} from "react-router-dom";
import {
  SwitchTransition,
  CSSTransition,
} from "react-transition-group";
import { mainRoutes } from "../../../router/routes";

export default function MainPage() {
  const currentOutlet = useOutlet();

  const location = useLocation().pathname;

  const { nodeRef } =
    mainRoutes.find(
      (route) => route.path === location
    ) ?? {};

  return (
    <>
      <SwitchTransition>
        <CSSTransition
          key={location}
          nodeRef={nodeRef}
          timeout={300}
          classNames="page"
          unmountOnExit>
          {() => (
            <div ref={nodeRef} className="page">
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}
