import { DocumentData } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { getStorage, ref as storageRef } from 'firebase/storage';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { useGetPhotoQuery } from '../../api/apiSlise'
import { useAppDispatch } from '../../../store';
import { Master } from '../../../types'
import { storage } from '../../../db/firebaseConfig';
import { setContentLoadingState } from '../content/ContentSlice';

interface Props {
    master: Master
}

export default function MasterListItem({ master }: Props) {
    const { data: masterPhotoUrl, isLoading, isError } = useGetPhotoQuery(master.photoLink);


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setContentLoadingState({
            isLoading, isError, key: 'masterPhotoUrl'
        }))
    }, [isLoading, isError])

    return (
        <div className="cards__item">
            <img className="cards__item-img" src={masterPhotoUrl} alt="фото мастера" />
            <h4 className="cards__item-title">{master.name}</h4>
            <p className="cards__item-about">{master.profession}</p>
        </div>
    )
}