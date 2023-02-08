import React from 'react'
import Content from '../../components/Content'
import Error from '../../components/Error';
import Header from '../../components/Header'
import Spinner from '../../components/Spinner';
import { useAppSelector } from '../../store';
import './main.css'

export default function Main() {
    const loadingState = useAppSelector(state => state.loadingState);

    const isLoading = Object.values(loadingState.isLoading).some(i => i === true)
    const isError = Object.values(loadingState.isError).some(i => i === true)

    return (
        <>
            <Header />
            <Spinner isLoading={isLoading} />
            <Error isError={isError} />
            <Content isLoading={isLoading} isError={isError} />
        </>
    )
}
