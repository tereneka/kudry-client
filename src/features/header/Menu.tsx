import { nanoid } from "nanoid";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const navLinkList = [
    {
      path: "/",
      text: "команда",
      target: "_self",
    },
    {
      path: "/price",
      text: "цены",
      target: "_self",
    },
    {
      path: "/interior",
      text: "интерьер",
      target: "_self",
    },
    {
      path: "/works",
      text: "работы",
      target: "_self",
    },
    {
      path: "/online-reg",
      text: "online запись",
      target: "_blank",
    },
  ];

  return (
    <nav>
      <ul className="header__links">
        {navLinkList.map((link) => (
          <li key={nanoid()}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `header__link ${
                  isActive
                    ? "header__link_active"
                    : ""
                }`
              }
              target={link.target}>
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
