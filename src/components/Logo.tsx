import React from 'react'
import scissors from '../images/logo/scissors.svg'

export default function Logo() {
    return (
        <>
            <a className="logo header__logo" href="#">
                <h2 className="logo__subtitle">салон красоты</h2>
                <h1 className="logo__title">К<img className="logo__img" src={scissors} alt="У" />дри</h1>
            </a>
        </>
    )
}
