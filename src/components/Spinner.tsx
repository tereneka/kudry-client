import React from 'react'

interface Props {
    isVisible: boolean
}

export default function Spinner({ isVisible }: Props) {
    return (
        <div className={isVisible ? 'spinner spinner_visible' : 'spinner'} ><i></i></div >
    )
}
