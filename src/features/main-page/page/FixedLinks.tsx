import React from "react";
import { Link } from "react-router-dom";

export default function FixedLinks() {
  return (
    <ul className="root__fixed-links">
      <li>
        <div className="root__fixed-link-pulse"></div>
        <Link
          className="root__fixed-link root__fixed-link_name_reg"
          to={"/online-reg"}
          target={"_blank"}>
          online запись
        </Link>
      </li>
      <li>
        <a
          className="root__fixed-link root__fixed-link_name_up"
          href="#header"
        />
      </li>
    </ul>
  );
}
