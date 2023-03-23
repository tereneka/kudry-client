import React from 'react'

export default function Menu() {
    return (
        <>
            <nav>
                <ul className="header__links">
                    <li><a className="header__link" href="#team">команда</a></li>
                    <li><a className="header__link" href="#price">цены</a></li>
                    <li><a className="header__link" href="#interiors">интерьер</a></li>
                    <li><a className="header__link" href="#works">работы</a></li>
                    <li><a className="header__link" href="#footer">контакты</a></li>
                </ul>
            </nav>
        </>
    )
}
