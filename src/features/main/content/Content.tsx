import React from 'react'
import { LoadingState } from '../../../types';
import MasterList from '../masters/MasterList'
import Price from '../price/Price';


export default function Content({ isLoading, isError }: LoadingState) {
    return (
        <main className={(isLoading || isError) ? 'content' : 'content content_visible'} >
            <MasterList />
            <Price />
        </main>
    )
}
