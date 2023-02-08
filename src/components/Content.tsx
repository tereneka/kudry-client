import React from 'react'
import { LoadingState } from '../types';
import MasterList from './MasterList'


export default function Content({ isLoading, isError }: LoadingState) {
    return (
        <main className={(isLoading || isError) ? 'content' : 'content content_visible'} >
            <MasterList />
        </main>
    )
}
