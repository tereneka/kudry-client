import React from 'react'

interface Props {
    isVisible: boolean
}

export default function Error({ isVisible }: Props) {

    return (
        <p className="error">
            {isVisible && 'произошла ошибка:('}
        </p>
    )
}
