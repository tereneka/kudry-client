import React from 'react'
import MasterList from '../masters/MasterList'
import PhotoSection from '../photo/PhotoSection';
import Price from '../price/Price';

interface Props {
    isLoading: boolean;
    isError: boolean;
}


export default function Content({ isLoading, isError }: Props) {
    return (
        <main className={`content ${(isLoading || isError) ? '' : 'content_visible'}`} >
            <MasterList />
            <Price />
            <PhotoSection title='интерьер' folderPath='interiors' />
            <PhotoSection title='работы' folderPath='works' />
        </main>
    )
}
