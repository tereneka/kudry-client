import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

export default function Header() {
    return (
        <>
            <header className="header" id="header">
                <Logo />
                <Menu />
            </header>
        </>
    )
}
