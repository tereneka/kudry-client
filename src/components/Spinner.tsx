import React from 'react'
import { LoadingState } from '../types';

export default function Spinner({ isLoading }: LoadingState) {
    return (
        <div className={isLoading ? 'spinner spinner_visible' : 'spinner'} ><i></i></div >
    )
}
