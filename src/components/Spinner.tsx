import React from 'react'

interface Props {
    isVisible: boolean
}

export default function Spinner({ isVisible }: Props) {
    return (
        <div className={`spinner ${isVisible ? 'spinner_visible' : ''}`} ><i></i></div >
    )
}
