import React from 'react'
import { LoadingState } from '../types';

export default function Error({ isError }: LoadingState) {

    return (
        <p className="error">
            {isError && 'произошла ошибка:('}
        </p>
    )
}
