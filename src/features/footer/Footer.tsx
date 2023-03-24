import React from "react";
import map from "../../images/icons/map.svg";
import telephone from "../../images/icons/telephone.svg";
import insta from "../../images/icons/insta.svg";
import whatsapp from "../../images/icons/whatsapp.svg";
import telegram from "../../images/icons/telegram.svg";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <ul className="footer__contacts">
        <li>
          <a
            className="footer__contacts-link"
            target="_blank"
            href=" https://yandex.ru/navi/?whatshere%5Bpoint%5D=38.108040%2C55.813404&whatshere%5Bzoom%5D=18&lang=ru&from=navi">
            <img src={map} alt="адрес" />
            МО, д. Новая купавна, 13
          </a>
        </li>
        <li>
          <a
            className="footer__contacts-link"
            href="tel:+79858536908">
            <img src={telephone} alt="телефон" />
            +7(985) 853-69-08
          </a>
        </li>
      </ul>

      <ul className="footer__social">
        <li>
          <a
            className="footer__contacts-link"
            target="_blank"
            href="https://www.instagram.com/kudri.hair/">
            <img src={insta} alt="Instagram" />
          </a>
        </li>
        <li>
          <a
            className="footer__contacts-link"
            target="_blank"
            href="https://wa.me/79858536908">
            <img src={whatsapp} alt="whatsapp" />
          </a>
        </li>
        <li>
          <a
            className="footer__contacts-link"
            target="_blank"
            href="https://t.me/kudri_hair">
            <img src={telegram} alt="telegram" />
          </a>
        </li>
      </ul>
      <p className="footer__time">
        понедельник&mdash;воскресенье
        <br />
        11:00.............21:00
      </p>
      <a
        className="footer__copyright"
        target="_blank"
        href="https://tereneka.github.io/portfolio/">
        &copy;created by terenEka
      </a>
    </footer>
  );
}
