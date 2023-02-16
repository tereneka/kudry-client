import React from 'react'
import MasterList from '../masters/MasterList'
import PhotoList from '../photo/PhotoList';
import Price from '../price/Price';

interface Props {
    isLoading: boolean;
    isError: boolean;
}


export default function Content({ isLoading, isError }: Props) {
    return (
        <main className={(isLoading || isError) ? 'content' : 'content content_visible'} >
            <MasterList />
            <Price />
            <PhotoList title='интерьер' folderPath='interiors' />
            <PhotoList title='работы' folderPath='works' />
        </main>
    )
}
