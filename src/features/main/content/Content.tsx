import React from 'react'
import { LoadingState } from '../../../types';
import MasterList from '../masters/MasterList'
import PhotoList from '../photo/PhotoList';
import Price from '../price/Price';


export default function Content({ isLoading, isError }: LoadingState) {
    return (
        <main className={(isLoading || isError) ? 'content' : 'content content_visible'} >
            <MasterList />
            <Price />
            <PhotoList title='интерьер' photoFolderPath='interiors' />
            <PhotoList title='работы' photoFolderPath='works' />
        </main>
    )
}
