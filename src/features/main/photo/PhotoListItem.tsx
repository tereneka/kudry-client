import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store';
import { useGetPhotoQuery } from '../../api/apiSlise';
import { setPhotoLoadingState } from './PhotoSlice';

interface Props {
    photoPath: string | undefined;
    folderPath: string;
    pageNumber: string;
}

export default function PhotoListItem({ photoPath, folderPath, pageNumber }: Props) {
    const { data: photoUrl, isLoading, isError } = useGetPhotoQuery(photoPath);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPhotoLoadingState({
            isLoading,
            isError,
            folderPath,
            pageNumber,
            key: photoPath ? photoPath : ''
        }))
    }, [isLoading, isError, photoPath])

    return (
        <img className="photo__item" src={photoUrl} alt="фото" />
    )
}
