import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const linkList = [
    {
      path: "#team",
      text: "команда",
    },
    {
      path: "#price",
      text: "цены",
    },
    {
      path: "#interiors",
      text: "интерьер",
    },
    {
      path: "#works",
      text: "работы",
    },
    {
      path: "#footer",
      text: "контакты",
    },
  ];

  return (
    <>
      <nav>
        <ul className="header__links">
          {linkList.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="header__link">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
