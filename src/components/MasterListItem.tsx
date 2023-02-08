import React, { useEffect } from 'react'
import { isError } from 'util';
import { useGetPhotoQuery } from '../slices/apiSlise'
import { setIsLoadingState } from '../slices/LoadingState';
import { useAppDispatch } from '../store';
import { Master } from '../types'

interface Props {
    master: Master
}

export default function MasterListItem({ master }: Props) {
    const { data: masterPhoto, isLoading, isError } = useGetPhotoQuery(master.photoLink);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setIsLoadingState({
            isLoading, isError, key: 'masterPhoto'
        }))
    }, [isLoading, isError])

    return (
        <div className="cards__item">
            <img className="cards__item-img" src={masterPhoto} alt="фото мастера" />
            <h4 className="cards__item-title">{master.name}</h4>
            <p className="cards__item-about">{master.profession}</p>
        </div>
    )
}