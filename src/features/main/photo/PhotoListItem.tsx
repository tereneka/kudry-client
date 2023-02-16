import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../store';
import { useGetPhotoQuery } from '../../api/apiSlise';
import { setIsLoadingState } from '../content/ContentSlice';

interface Props {
    photoPath: string | undefined
}

export default function PhotoListItem({ photoPath }: Props) {
    const { data: photoUrl, isLoading, isError } = useGetPhotoQuery(photoPath);

    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(setIsLoadingState({
    //         isLoading, isError, key: photoPath
    //     }))
    // }, [isLoading, isError])

    return (
        <img className="photo__item" src={photoUrl} alt="фото" />
    )
}
